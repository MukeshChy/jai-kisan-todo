import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/interfaces/task';
import { Store } from '@ngxs/store';
import { AddTask, DeleteTask, UpdateTask } from '../task.action';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {

  @Input() tasks: Task[] = [];
  newTask = null;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  addTask() {
    if (this.newTask) {
      this.store.dispatch(new AddTask(this.newTask));
      setTimeout(() => {
        this.newTask = null;
      }, 100);
    }
  }

  markAsComplete(task: Task) {
    task.isCompleted = true;
    this.store.dispatch(new UpdateTask(task));
  }

  deleteTask(taskId: number) {
    this.store.dispatch(new DeleteTask(taskId));
  }

}
