import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListViewComponent } from './component/task-list-view/task-list-view.component';
import { TaskDetailViewComponent } from './component/task-detail-view/task-detail-view.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    TaskListViewComponent,
    TaskDetailViewComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: TaskListViewComponent}
    ]),
    CommonModule
  ]
})
export class TaskViewModule { }
