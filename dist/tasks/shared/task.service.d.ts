import { Task } from './task';
export declare class TaskService {
    tasks: Task[];
    getAll(): Task[];
    getById(id: number): Task;
    create(task: Task): Task;
    update(task: Task): Task;
    delete(id: number): string;
}
