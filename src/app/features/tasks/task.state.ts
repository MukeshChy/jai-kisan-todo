import { Injectable } from "@angular/core";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { Task } from "src/app/shared/interfaces/task";
import { TaskStateModel } from "src/app/shared/interfaces/task-state-model";
import { AddTask, DeleteTask, LoadTasks, UpdateLocalStorage, UpdateTask } from "./task.action";

@State<TaskStateModel>({
    name: 'tasks',
    defaults: {
        tasks: []
    }
})

@Injectable()
export class TaskState {

    @Selector()
    static Tasks(state: TaskStateModel): TaskStateModel {
        return state;
    }

    @Action(LoadTasks)
    loadTasks(ctx: StateContext<TaskStateModel>) {
        const tasks = localStorage.getItem('tasks');
        ctx.setState({tasks: tasks ? JSON.parse(tasks) : []})
    }

    @Action(AddTask)
    addTask(ctx: StateContext<TaskStateModel>, action: AddTask) {
        const tasks = ctx.getState().tasks;
        const newTask: Task = {
            text: action.task,
            id: tasks.length ? Math.max(...tasks.map(task => { return task.id})) + 1 : 1,
            isCompleted: false
        }
        ctx.patchState({
            tasks: [newTask, ...tasks]
        });
        ctx.dispatch(new UpdateLocalStorage());
    }

    @Action(UpdateTask)
    updateTask(ctx: StateContext<TaskStateModel>, action: UpdateTask) {
        const tasks = ctx.getState().tasks;
        const taskIndex = tasks.findIndex(task => task.id === action.task.id);
        if (taskIndex !== -1) {
            tasks[taskIndex].isCompleted = action.task.isCompleted;
            tasks[taskIndex].text = action.task.text;
            ctx.patchState({
                tasks: tasks
            });
            ctx.dispatch(new UpdateLocalStorage());
        }
    }

    @Action(DeleteTask)
    deleteTask(ctx: StateContext<TaskStateModel>, action: DeleteTask) {
        const tasks = ctx.getState().tasks;
        const taskIndex = tasks.findIndex(task => task.id === action.taskId);
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1)
            ctx.patchState({
                tasks: tasks
            });
            ctx.dispatch(new UpdateLocalStorage());
        }
    }

    @Action(UpdateLocalStorage)
    updateLocalStorage(ctx: StateContext<TaskStateModel>) {
        const tasks = ctx.getState().tasks;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

}