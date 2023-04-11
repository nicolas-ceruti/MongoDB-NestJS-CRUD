import { Injectable } from '@nestjs/common';
import { Task } from './task';

@Injectable()
export class TaskService {
    tasks: Task[] = [
        {id: 1, description: "Task 1", completed: false},
        {id: 2, description: "Task 2", completed: false},
        {id: 3, description: "Task 3", completed: false},
        {id: 4, description: "Task 4", completed: false},
        {id: 5, description: "Task 5", completed: false},
        {id: 6, description: "Task 6", completed: false},
        {id: 7, description: "Task 7", completed: false},
        {id: 8, description: "Task 8", completed: false},
        {id: 9, description: "Task 9", completed: false},
        {id: 10, description: "Task 10", completed: false},
    ];

    getAll(){
        return this.tasks
    }

    getById(id: number){
        const task = this.tasks.find((value) => value.id == id)
        return task
    }

    create(task: Task){
        let lastId = 0
        if(this.tasks.length > 0){
            lastId = this.tasks[this.tasks.length - 1].id
        }

        task.id = lastId + 1
        this.tasks.push(task)

        return task
    }

    update(task: Task){
        const taskObj = this.getById(task.id);
        if(taskObj){
            taskObj.description = task.description;
            taskObj.completed = task.completed;
        }

        return taskObj;
        
    }

    delete(id: number){
        const indexObj = this.tasks.findIndex((value) => value.id = id)
        this.tasks.splice(indexObj, 1);

        return "Deletado Com Sucesso"
    }
}