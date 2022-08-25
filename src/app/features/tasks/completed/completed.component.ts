import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/interfaces/task';
import { Store } from '@ngxs/store';
import { DeleteTask, UpdateTask } from '../task.action';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit {

  @Input() tasks: Task[] = [];

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  markAsComplete(task: Task) {
    task.isCompleted = false;
    this.store.dispatch(new UpdateTask(task));
  }

  deleteTask(taskId: number) {
    this.store.dispatch(new DeleteTask(taskId));
  }

}
