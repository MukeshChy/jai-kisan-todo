import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TaskState } from './features/tasks/task.state';
import { NgxsModule } from '@ngxs/store';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([TaskState])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
