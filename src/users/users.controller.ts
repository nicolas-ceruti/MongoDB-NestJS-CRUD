import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user-dto';
import { Validation } from '..//validation/validation';

@Controller('api')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get('user/:id')
  public async getUser(@Param('id') id: number): Promise<UserDto> {
    return await this.userService.getById(id);
  }

  @Get('user/:id/avatar')
  public async getAvatar(@Param('id') id: number): Promise<string> {
    return await this.userService.getAvatar(id);
  }

  @Post('/users')
  @UseFilters(Validation)
  public async createUser(@Body() userDTO: UserDto): Promise<UserDto> {
    return this.userService.create(userDTO);
  }

  @Delete('user/:id/avatar')
  public async deleteAvatar(@Param('id') id: number): Promise<string> {
    return this.userService.deleteAvatar(id);
  }
}
