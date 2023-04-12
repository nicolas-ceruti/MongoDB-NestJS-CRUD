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
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const axios_2 = require("axios");
let UserService = class UserService {
    constructor(userModel, mailerService, httpService) {
        this.userModel = userModel;
        this.mailerService = mailerService;
        this.httpService = httpService;
    }
    async create(user) {
        const userQuery = await this.userModel.findOne({ email: user.email });
        if (userQuery) {
            throw new common_1.BadRequestException(`The email '${user.email}' has already been registered!`);
        }
        const createdUser = new this.userModel(user);
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Congratulations! You are part of the payever team!',
            context: { name: user.last_name },
        });
        return await createdUser.save();
    }
    async getById(id) {
        try {
            const require = this.httpService.get(`https://reqres.in/api/users/${id}`);
            const response = await (0, rxjs_1.lastValueFrom)(require);
            return response.data.data;
        }
        catch (error) {
            throw new common_1.NotFoundException(`The user with id ${id} does not exist!`);
        }
    }
    async getAvatar(id) {
        const user = await this.userModel.findOne({ _id: id });
        const avatar = user.avatar;
        if (avatar.startsWith('http')) {
            const response = await axios_2.default.get(avatar, { responseType: 'arraybuffer' });
            const hash = (crypto.createHash('sha256').update(response.data).digest('hex'));
            const fileName = `${hash}.jpg`;
            const filePath = path.join(`${process.cwd()}/src/users/avatar-img/${fileName}`);
            fs.writeFileSync(filePath, Buffer.from(response.data), 'binary');
            user.avatar = fileName;
            const updated = await this.userModel.updateOne({ _id: id }, user).exec();
            return `The image was successfully saved!`;
        }
        else if (!user.avatar) {
            throw new common_1.BadRequestException(`The user does not have avatar!`);
        }
        throw new common_1.BadRequestException(`The image has already been saved in the system!`);
    }
    async deleteAvatar(id) {
        const user = await this.userModel.findOne({ _id: id });
        if (!user.avatar) {
            throw new common_1.NotFoundException(`The user with id ${id} does not have avatar!`);
        }
        const filePath = path.resolve(`${process.cwd()}/src/users/avatar-img`, user.avatar);
        await fs.promises.unlink(filePath);
        user.avatar = "";
        const updated = await this.userModel.updateOne({ _id: id }, user).exec();
        return `The image was successfully deleted!`;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Users')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        dist_1.MailerService,
        axios_1.HttpService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map