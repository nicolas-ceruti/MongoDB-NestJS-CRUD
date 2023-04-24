import { UserService } from './user.service';
import { UserDto } from './dto/user-dto';
export declare class UsersController {
    private userService;
    constructor(userService: UserService);
    getUser(id: number): Promise<UserDto>;
    getAvatar(id: number): Promise<string>;
    createUser(userDTO: UserDto): Promise<UserDto>;
    deleteAvatar(id: number): Promise<string>;
}
