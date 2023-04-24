require('dotenv/config');
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { RabbitMqService } from './rabbit-mq/rabbit-mq.service';

@Module({
  imports: [
    MongooseModule.forRoot(`${process.env.MONGODB_ATLAS_URI}`),
    UsersModule, 
  ],
  controllers: [],
  providers: [ RabbitMqService],
})
export class AppModule {}
