import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserDto } from './user-dto/user-dto';
import { UserService } from './user.service';
import { UserSchema } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    MongooseModule.forFeature([{name : 'Users', schema: UserSchema}]),
    MailerModule.forRoot({
      transport:{
        host: 'smtp.gmail.com',
        auth: {
          user: 'mss.rajnikant1993@gmail.com',
          pass: 'jqpbajqwzpnardvw',
        }
      }
    }),
    HttpModule
  ],
  controllers: [UsersController],
  providers: [UserService ]
})
export class UsersModule {}
