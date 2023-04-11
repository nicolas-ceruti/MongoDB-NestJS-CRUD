/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Task } from './task';
import { Model } from 'mongoose';
export declare class TaskService {
    private readonly taskModel;
    constructor(taskModel: Model<Task>);
    getAll(): Promise<(import("mongoose").Document<unknown, {}, Task> & Omit<Task & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    getById(id: string): Promise<import("mongoose").Document<unknown, {}, Task> & Omit<Task & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    create(task: Task): Promise<import("mongoose").Document<unknown, {}, Task> & Omit<Task & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    update(id: string, task: Task): Promise<import("mongoose").Document<unknown, {}, Task> & Omit<Task & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    delete(id: string): Promise<import("mongodb").DeleteResult>;
}
