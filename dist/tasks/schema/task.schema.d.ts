import * as mongoose from 'mongoose';
export declare const TaskSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    description?: string;
    completed?: boolean;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    description?: string;
    completed?: boolean;
}>> & Omit<mongoose.FlatRecord<{
    description?: string;
    completed?: boolean;
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
