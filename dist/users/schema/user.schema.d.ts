import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    email?: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    id?: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    email?: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    id?: number;
}>> & Omit<mongoose.FlatRecord<{
    email?: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    id?: number;
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
