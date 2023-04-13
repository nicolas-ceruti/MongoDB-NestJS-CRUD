"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMqService = void 0;
const common_1 = require("@nestjs/common");
const amqp = require("amqplib");
require("dotenv/config");
let RabbitMqService = class RabbitMqService {
    async init() {
        this.connection = await amqp.connect(process.env.RABBITMQ_URL);
        this.channel = await this.connection.createChannel();
        await this.channel.assertExchange('user_created', 'fanout');
    }
    async sendMessage(userInfo) {
        this.channel.publish('user-created', '', Buffer.from(JSON.stringify(userInfo)));
    }
};
RabbitMqService = __decorate([
    (0, common_1.Injectable)()
], RabbitMqService);
exports.RabbitMqService = RabbitMqService;
//# sourceMappingURL=rabbit-mq.service.js.map