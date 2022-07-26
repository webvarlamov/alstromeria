import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoryListViewComponent} from './component/story-list-view/story-list-view.component';
import {StoryDetailViewComponent} from './component/story-detail-view/story-detail-view.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    StoryListViewComponent,
    StoryDetailViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: StoryListViewComponent}
    ]),
  ]
})
export class StoryViewModule { }
