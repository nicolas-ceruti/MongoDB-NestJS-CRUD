import { Injectable, BadRequestException } from '@nestjs/common';
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

        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Congratulations! You are part of the payever team!',
            context: { name: user.last_name },
        });

        return await createdUser.save();
    }


    async getById(id: number): Promise<UserDto> {
        const require = this.httpService.get(`https://reqres.in/api/users/${id}`);
        const response = await lastValueFrom(require);
        return response.data.data;
        //incluir validação se der tempo
    }




    async getAvatar(id: number) {

        const user = await this.userModel.findOne({ _id: id });
        const avatar = user.avatar

        if (avatar.startsWith('http')) {
            const response = await axios.get(avatar, { responseType: 'arraybuffer' });
            const hash = crypto.createHash('sha256').update(response.data).digest('hex');
            const fileName = `${hash}.jpg`;
            const filePath = path.join(`${process.cwd()}/src/users/avatar-img`, fileName);
            fs.writeFileSync(filePath, Buffer.from(response.data), 'binary');

            user.avatar = hash
            const updated = await this.userModel.updateOne({ _id : id}, user).exec();

            return updated

        } else {
            throw new BadRequestException(
                `A imagem já foi salva no Sistema!`
            );
        }
        










    }

}
