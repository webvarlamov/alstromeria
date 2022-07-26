import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlanListViewComponent} from './component/plan-list-view/plan-list-view.component';
import { PlanDetailViewComponent } from './component/plan-detail-view/plan-detail-view.component';
import {RouterModule} from "@angular/router";
import {CommonComponentsModule} from "../../modules/common-components-module/common-components.module";
import {InputComponentsModule} from "../../modules/input-components-module/input-components.module";
import {TableModule} from "../../modules/table-components-module/table.module";
import {FieldsetModuleModule} from "../../modules/fieldset-components-module/fieldset-module.module";
import {FilterModuleModule} from "../../modules/filter-components-module/filter-module.module";
import {ModalWindowModuleModule} from "../../modules/modal-window-module/modal-window-module.module";


@NgModule({
    declarations: [
        PlanListViewComponent,
        PlanDetailViewComponent
    ],
    exports: [
        PlanListViewComponent
    ],
  imports: [
    RouterModule.forChild([
      {path: '', component: PlanListViewComponent}
    ]),
    CommonModule,
    CommonComponentsModule,
    InputComponentsModule,
    TableModule,
    FieldsetModuleModule,
    FilterModuleModule,
    ModalWindowModuleModule,
  ]
})
export class PlanViewModule { }
