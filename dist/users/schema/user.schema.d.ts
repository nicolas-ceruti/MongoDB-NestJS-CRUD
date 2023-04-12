import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    email?: string;
    avatar?: string;
    firstName?: string;
    lastName?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    email?: string;
    avatar?: string;
    firstName?: string;
    lastName?: string;
}>> & Omit<mongoose.FlatRecord<{
    email?: string;
    avatar?: string;
    firstName?: string;
    lastName?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
