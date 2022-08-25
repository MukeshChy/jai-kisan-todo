import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Task } from 'src/app/shared/interfaces/task';
import { TaskStateModel } from 'src/app/shared/interfaces/task-state-model';
import { LoadTasks } from './task.action';
import { TaskState } from './task.state';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  @Select(TaskState.Tasks)
  tasks$!: Observable<TaskStateModel>;

  completedTasks: Task[] = [];
  pendingTasks: Task[] = [];

  constructor(private store: Store) {
    this.tasks$.subscribe((state: TaskStateModel) => {
      this.pendingTasks = state.tasks.filter(task => !task.isCompleted);
      this.completedTasks = state.tasks.filter(task => task.isCompleted);
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadTasks());
  }

}
