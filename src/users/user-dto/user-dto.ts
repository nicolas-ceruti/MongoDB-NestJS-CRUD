import { IsEmail, Contains, IsNotEmpty, MaxLength } from 'class-validator';

export class UserDto {

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MaxLength(50)
  firstName: string;

  @IsNotEmpty()
  @MaxLength(50)
  lastName: string;

  @Contains('http')
  avatar: string;
}
