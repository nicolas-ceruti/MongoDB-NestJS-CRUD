/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { UserDto } from './user-dto/user-dto';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { HttpService } from '@nestjs/axios';
import { RabbitMqService } from 'src/rabbit-mq/rabbit-mq.service';
export declare class UserService {
    private readonly userModel;
    private readonly mailerService;
    private httpService;
    private readonly rabbitService;
    constructor(userModel: Model<UserDto>, mailerService: MailerService, httpService: HttpService, rabbitService: RabbitMqService);
    create(user: UserDto): Promise<import("mongoose").Document<unknown, {}, UserDto> & Omit<UserDto & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    getById(id: number): Promise<UserDto>;
    getAvatar(UserId: number): Promise<string>;
    deleteAvatar(UserId: number): Promise<string>;
}
