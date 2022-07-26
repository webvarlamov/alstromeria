import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'plan-view', pathMatch: 'full' },
      { path: 'plan-view', loadChildren: () => import('./view/plan-view/plan-view.module').then(m => m.PlanViewModule) },
      { path: 'story-view', loadChildren: () => import('./view/story-view/story-view.module').then(m => m.StoryViewModule) },
      { path: 'target-view', loadChildren: () => import('./view/target-view/target-view.module').then(m => m.TargetViewModule) },
      { path: 'task-executor-view', loadChildren: () => import('./view/task-executor-view/task-executor-view.module').then(m => m.TaskExecutorViewModule) },
      { path: 'task-view', loadChildren: () => import('./view/task-view/task-view.module').then(m => m.TaskViewModule) },
    ], {
      useHash: true
    }),
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
