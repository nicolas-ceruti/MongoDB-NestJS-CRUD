import { IsEmail, IsNotEmpty, IsString, Contains } from 'class-validator';

export class UserDto {
    @IsEmail()
    email: string;

    first_name: string;

    last_name: string;

    @Contains('http')
    avatar: string;
}
