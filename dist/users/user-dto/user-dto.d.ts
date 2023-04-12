import { Document } from 'mongoose';
export declare class UserDto extends Document {
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}
