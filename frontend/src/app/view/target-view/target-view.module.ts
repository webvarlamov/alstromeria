import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TargetListViewComponent } from './component/target-list-view/target-list-view.component';
import { TargetDetailViewComponent } from './component/target-detail-view/target-detail-view.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    TargetListViewComponent,
    TargetDetailViewComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: TargetListViewComponent}
    ]),
    CommonModule
  ]
})
export class TargetViewModule { }
