import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskExecutorListViewComponent} from './component/task-executor-list-view/task-executor-list-view.component';
import {TaskExecutorDetailViewComponent} from './component/task-executor-detail-view/task-executor-detail-view.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    TaskExecutorListViewComponent,
    TaskExecutorDetailViewComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: TaskExecutorListViewComponent}
    ]),
    CommonModule
  ]
})
export class TaskExecutorViewModule { }
