import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CrudToolbarComponent} from './components/crud-toolbar/crud-toolbar.component';
import {SaveOrCancelToolbarComponent} from './components/save-or-cancel-toolbar/save-or-cancel-toolbar.component';
import {InputComponentsModule} from "../input-components-module/input-components.module";
import {AcceptRejectButtonsComponent} from "./components/accept-reject-buttons/accept-reject-buttons.component";

@NgModule({
  declarations: [
    CrudToolbarComponent,
    SaveOrCancelToolbarComponent,
    AcceptRejectButtonsComponent
  ],
  exports: [
    CrudToolbarComponent,
    SaveOrCancelToolbarComponent,
    AcceptRejectButtonsComponent,
  ],
  imports: [
    CommonModule,
    InputComponentsModule
  ]
})
export class CommonComponentsModule {
}
