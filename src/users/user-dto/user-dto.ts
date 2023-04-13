import { Document } from 'mongoose'
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto extends Document{
    @IsEmail()
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}
