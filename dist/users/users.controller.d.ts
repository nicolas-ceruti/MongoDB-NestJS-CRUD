import { UserService } from './user.service';
import { UserDto } from './user-dto/user-dto';
export declare class UsersController {
    private userService;
    constructor(userService: UserService);
    getUser(id: number): Promise<any>;
    getAvatar(id: number): Promise<any>;
    createUser(userDTO: UserDto): Promise<UserDto>;
    deleteAvatar(id: number): Promise<any>;
}
