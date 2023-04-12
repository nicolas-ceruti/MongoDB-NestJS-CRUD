import { Body, Controller, Delete, Get, Param, Post, Res, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user-dto/user-dto';
import { Response } from 'express'; 

@Controller('api')
export class UsersController {

    constructor(private userService: UserService) { }

    @Get('user/:id')
    public async getUser(@Param('id') id: number): Promise<any> {
        return this.userService.getById(id);
    }

    @Post('/users')
    public async createUser(@Body() userDTO: UserDto): Promise<UserDto> {
        return this.userService.create(userDTO);
    }

    // @Delete('user/:id/avatar')
    // public async deleteAvatar(@Param('id') id: number): Promise<any> {
    //     this.userService.deleteAvatar(id);
    //     return { message: 'User Avatar successfully deleted!' };
    // }


    @Get('user/:id/avatar')
    public async getAvatar(@Param('id') id: number): Promise<any> {
        return await this.userService.getAvatar(id);
       
      }

}
