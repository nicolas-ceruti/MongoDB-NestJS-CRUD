import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './user-dto/user-dto';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

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
        // private readonly rabbitService: RabbitService,
    ) { }


    async create(user: UserDto) {

        const userQuery = await this.userModel.findOne({ email: user.email });
        if (userQuery) {
            throw new BadRequestException(
                `The email '${user.email}' has already been registered!`
            );
        }

        const createdUser = new this.userModel(user);

        //Send Rabbit Message
        // await this.rabbitService.sendMessage({ userId: createdUser.id });

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


    async getAvatar(id: number) {
        const user = await this.userModel.findOne({ _id: id });
        const avatar = user.avatar

        if (avatar.startsWith('http')) {
            const response = await axios.get(avatar, { responseType: 'arraybuffer' });
            const hash = (crypto.createHash('sha256').update(response.data).digest('hex'));
            const fileName = `${hash}.jpg`;
            const filePath = path.join(`${process.cwd()}/src/users/avatar-img/${fileName}`);
            fs.writeFileSync(filePath, Buffer.from(response.data), 'binary');

            user.avatar = fileName
            const updated = await this.userModel.updateOne({ _id: id }, user).exec();

            return `The image was successfully saved!`

        } else if (!user.avatar) {
            throw new BadRequestException(`The user does not have avatar!`);
        }
        throw new BadRequestException(`The image has already been saved in the system!`);
    }


    async deleteAvatar(id: number) {

        const user = await this.userModel.findOne({ _id: id });

        if (!user.avatar) {
            throw new NotFoundException(`The user with id ${id} does not have avatar!`);
        }

        const filePath = path.resolve(`${process.cwd()}/src/users/avatar-img`, user.avatar);
        await fs.promises.unlink(filePath);
        user.avatar = ""
        const updated = await this.userModel.updateOne({ _id: id }, user).exec();

        return `The image was successfully deleted!`

    }

}
