import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user-dto/user-dto';
import { Validation } from '..//validation/validation';
import { Response } from 'express'

@Controller('api')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get('user/:id')
  public async getUser(@Param('id') id: number): Promise<any> {
    return await this.userService.getById(id);
  }

  @Get('user/:id/avatar')
  public async getAvatar(@Param('id') id: number): Promise<any> {
    return await this.userService.getAvatar(id);
  }

  @Post('/users')
  @UseFilters(Validation)
  public async createUser(@Body() userDTO: UserDto): Promise<UserDto> {
    return this.userService.create(userDTO);
  }

  @Delete('user/:id/avatar')
  public async deleteAvatar(@Param('id') id: number): Promise<any> {
    return this.userService.deleteAvatar(id);
  }
}
