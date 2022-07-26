import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldsetComponent } from './components/fieldset/fieldset.component';



@NgModule({
  declarations: [
    FieldsetComponent
  ],
  exports: [
    FieldsetComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FieldsetModuleModule { }
