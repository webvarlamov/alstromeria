import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterComponent} from './components/filter/filter.component';
import {ModalWindowModuleModule} from "../modal-window-module/modal-window-module.module";

@NgModule({
  declarations: [
    FilterComponent,
  ],
  exports: [
    FilterComponent,
  ],
  imports: [
    CommonModule,
    ModalWindowModuleModule
  ]
})
export class FilterModuleModule {
}
