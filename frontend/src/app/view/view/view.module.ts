import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListViewComponent } from './component/list-view/list-view.component';
import { DetailViewComponent } from './component/detail-view/detail-view.component';
import { FilterableListViewComponent } from './component/list-view/filterable-list-view-component.directive';



// @ts-ignore
@NgModule({
  declarations: [
    ListViewComponent,
    FilterableListViewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ViewModule { }
