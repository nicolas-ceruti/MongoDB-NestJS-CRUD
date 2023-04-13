import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './user-dto/user-dto';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { RabbitMqService } from 'src/rabbit-mq/rabbit-mq.service';
import * as fs from 'fs';
import * as crypto from 'crypto';
import * as path from 'path';
import axios from 'axios';


@Injectable()
export class UserService {

    constructor(
        @InjectModel('Users') private readonly userModel: Model<UserDto>,
        private readonly mailerService: MailerService,
        private httpService: HttpService,
        private readonly rabbitService: RabbitMqService,
    ) { }


    async create(user: UserDto) {
        const userQuery = await this.userModel.findOne({ email: user.email });

        if (userQuery) {
            throw new BadRequestException(
                `The email '${user.email}' has already been registered!`
            );
        }

        const lastId = (await this.userModel.find({}).sort({ _id: -1 }).limit(1));
        const createdUser = new this.userModel(user);
        createdUser.id = lastId[0].id + 1;

        try {
            await this.rabbitService.sendMessage({ userId: createdUser.id });
            
        } catch (error) {
            console.log(error)
        }

        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Congratulations! You are part of the payever team!',
            context: { name: user.last_name },
            
        });

        return await createdUser.save();
    }


    async getById(id: number): Promise<UserDto> {
        try {
            const require = this.httpService.get(`https://reqres.in/api/users/${id}`);
            const response = await lastValueFrom(require);
            return response.data.data;

        } catch (error) {
            throw new NotFoundException(`The user with id ${id} does not exist!`);
        }
    }


    async getAvatar(UserId: number) {
        const user = await this.userModel.findOne({ id: UserId });
        const avatar = user.avatar

        if (avatar.startsWith('http')) {
            const response = await axios.get(avatar, { responseType: 'arraybuffer' });
            const hash = (crypto.createHash('sha256').update(response.data).digest('hex'));
            const fileName = `${hash}.jpg`;
            const filePath = path.join(`${process.cwd()}/src/users/avatar-img/${fileName}`);
            fs.writeFileSync(filePath, Buffer.from(response.data), 'binary');

            user.avatar = fileName
            const updated = await this.userModel.updateOne({ id: UserId }, user).exec();

            return `The image was successfully saved!`

        } else if (!user.avatar) {
            throw new BadRequestException(`The user does not have avatar!`);
        }
        throw new BadRequestException(`The image has already been saved in the system!`);
    }


    async deleteAvatar(UserId: number) {

        const user = await this.userModel.findOne({ id: UserId });

        if (!user.avatar) {
            throw new NotFoundException(`The user with id ${UserId} does not have avatar!`);
        }

        const filePath = path.resolve(`${process.cwd()}/src/users/avatar-img`, user.avatar);
        await fs.promises.unlink(filePath);
        user.avatar = ""
        const updated = await this.userModel.updateOne({ id: UserId }, user).exec();

        return `The image was successfully deleted!`

    }

}
