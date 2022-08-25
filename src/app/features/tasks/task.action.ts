import { Task } from "src/app/shared/interfaces/task";

export class LoadTasks {
    static readonly type = '[Task State] Load Tasks';
    constructor() {}
}

export class AddTask {
    static readonly type = '[Task State] Add Task';
    constructor(public task: string) {}
}

export class UpdateTask {
    static readonly type = '[Task State] Update Task';
    constructor(public task: Task) {}
}

export class DeleteTask {
    static readonly type = '[Task State] Load Task';
    constructor(public taskId: number) {}
}

export class UpdateLocalStorage {
    static readonly type = '[Task State] Update Local Storage';
    constructor() {}
}