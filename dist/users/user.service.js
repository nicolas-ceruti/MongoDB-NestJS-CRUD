"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const dist_1 = require("@nestjs-modules/mailer/dist");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const rabbit_mq_service_1 = require("../rabbit-mq/rabbit-mq.service");
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const axios_2 = require("axios");
let UserService = class UserService {
    constructor(userModel, mailerService, httpService, rabbitService) {
        this.userModel = userModel;
        this.mailerService = mailerService;
        this.httpService = httpService;
        this.rabbitService = rabbitService;
    }
    async create(user) {
        const userQuery = await this.userModel.findOne({ email: user.email });
        if (userQuery) {
            throw new common_1.BadRequestException(`The email '${user.email}' has already been registered!`);
        }
        const lastId = await this.userModel.find({}).sort({ _id: -1 }).limit(1);
        const createdUser = new this.userModel(user);
        createdUser.id = lastId[0].id + 1;
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Congratulations! You are part of the payever team!',
            context: { name: user.last_name },
        });
        try {
            await this.rabbitService.sendMessage({ userId: createdUser.id });
        }
        catch (error) {
            console.log('Unable to send Rabbit');
        }
        return await createdUser.save();
    }
    async getById(id) {
        try {
            const require = this.httpService.get(`https://reqres.in/api/users/${id}`);
            const response = await (0, rxjs_1.lastValueFrom)(require);
            return response.data.data;
        }
        catch (error) {
            throw new common_1.BadRequestException(`The user with id ${id} does not exist!`);
        }
    }
    async getAvatar(UserId) {
        const user = await this.userModel.findOne({ id: UserId });
        const avatar = user.avatar;
        if (!user.avatar) {
            throw new common_1.BadRequestException(`The user does not have avatar!`);
        }
        else if (avatar.startsWith('http')) {
            const response = await axios_2.default.get(avatar, { responseType: 'arraybuffer' });
            const hash = user.id +
                crypto.createHash('sha256').update(response.data).digest('base64');
            const filePath = path.join(`${process.cwd()}/src/users/avatar-img/${hash}.jpg`);
            fs.writeFileSync(filePath, Buffer.from(response.data), 'binary');
            user.avatar = `${hash}.jpg`;
            await this.userModel
                .updateOne({ id: UserId }, user)
                .exec();
            return `${user.avatar}`;
        }
        return `${user.avatar}`;
    }
    async deleteAvatar(UserId) {
        const user = await this.userModel.findOne({ id: UserId });
        if (!user.avatar) {
            throw new common_1.BadRequestException(`The user with id ${UserId} does not have avatar!`);
        }
        const filePath = path.resolve(`${process.cwd()}/src/users/avatar-img`, user.avatar);
        await fs.promises.unlink(filePath);
        user.avatar = '';
        await this.userModel.updateOne({ id: UserId }, user).exec();
        return `The image was successfully deleted!`;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Users')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        dist_1.MailerService,
        axios_1.HttpService,
        rabbit_mq_service_1.RabbitMqService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map