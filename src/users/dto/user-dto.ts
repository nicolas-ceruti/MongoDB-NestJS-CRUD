import { IsEmail, Contains, IsNotEmpty, MaxLength, IsString } from 'class-validator';

export class UserDto {

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @MaxLength(50)
  firstName: string;

  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  lastName: string;

  @Contains('http')
  @IsString()
  avatar: string;
}
