import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectViewComponent } from './components/object-view/object-view.component';
import { ObjectPropertyViewComponent } from './components/object-view/components/object-property-view/object-property-view.component';
import { StringPropertyViewComponent } from './components/object-view/components/string-property-view/string-property-view.component';
import { ArrayPropertyViewComponent } from './components/object-view/components/array-property-view/array-property-view.component';
import { NumberPropertyViewComponent } from './components/object-view/components/number-property-view/number-property-view.component';
import { BooleanPropertyViewComponent } from './components/object-view/components/boolean-property-view/boolean-property-view.component';
import { AnyPropertyViewComponent } from './components/object-view/components/any-property-view/any-property-view.component';
import { EnumPropertyViewComponent } from './components/object-view/components/enum-property-view/enum-property-view.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ArrayElementControlComponent } from './components/object-view/components/control/array-element-controls/array-element-control.component';
import { ContextMenuControlComponent } from './components/object-view/components/control/context-menu-control/context-menu-control.component';
import { ObjectControlComponent } from './components/object-view/components/control/object-control/object-control.component';
import { ArrayControlComponent } from './components/object-view/components/control/array-control/array-control.component';
import {
  BaseValueControlComponent
} from "./components/object-view/components/control/primitive-control/base-value-control.component";

@NgModule({
    declarations: [
      ObjectViewComponent,
      ObjectPropertyViewComponent,
      StringPropertyViewComponent,
      ArrayPropertyViewComponent,
      NumberPropertyViewComponent,
      BooleanPropertyViewComponent,
      AnyPropertyViewComponent,
      EnumPropertyViewComponent,
      ArrayElementControlComponent,
      ContextMenuControlComponent,
      ObjectControlComponent,
      ArrayControlComponent,
      BaseValueControlComponent,
    ],
    exports: [
        ObjectViewComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ObjectViewModule { }
