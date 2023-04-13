import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';
import 'dotenv/config';

@Injectable()
export class RabbitMqService {
    private connection: amqp.Connection;
    private channel: amqp.Channel;

    async init() {
        this.connection = await amqp.connect(process.env.RABBITMQ_URL);
        this.channel = await this.connection.createChannel();

        await this.channel.assertExchange('user_created', 'fanout');
    }

    async sendMessage(userInfo: any) {
        this.channel.publish(
            'user-created',
            '',
            Buffer.from(JSON.stringify(userInfo)),
        );
    }
}
