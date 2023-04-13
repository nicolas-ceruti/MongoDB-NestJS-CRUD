require('dotenv/config');
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './user.service';
import { UserSchema } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { HttpModule } from '@nestjs/axios';
import { RabbitMqService } from 'src/rabbit-mq/rabbit-mq.service';

const user =process.env.MAILER_USER
const pass = process.env.MAILER_PASSWORD
const host = process.env.MAILER_HOST

@Module({
  imports: [
    MongooseModule.forFeature([{name : 'Users', schema: UserSchema}]),
    MailerModule.forRoot({
      transport:{
        host: host,
        auth: {
          user: user,
          pass: pass,
        }
      }
    }),
    HttpModule,
  ],
  controllers: [UsersController],
  providers: [UserService, RabbitMqService]
})
export class UsersModule {}
