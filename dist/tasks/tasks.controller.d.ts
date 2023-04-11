import { TaskService } from './shared/task.service';
import { Task } from './shared/task';
export declare class TasksController {
    private taskService;
    constructor(taskService: TaskService);
    getAll(): Promise<Task[]>;
    getById(id: number): Promise<Task>;
    create(task: Task): Promise<Task>;
    update(id: number, task: Task): Promise<Task>;
    delete(id: number): Promise<String>;
}
