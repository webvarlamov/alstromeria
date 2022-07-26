import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringInputComponent } from './components/string-input/string-input.component';
import { NumberInputComponent } from './components/number-input/number-input.component';
import { EnumInputComponent } from './components/enum-input/enum-input.component';
import { BooleanInputComponent } from './components/boolean-input/boolean-input.component';
import { DateTimeInputComponent } from './components/date-time-input/date-time-input.component';
import { PeriodInputComponent } from './components/period-input/period-input.component';
import { EntityInputComponent } from "./components/entity-input/entity-input.component";
import { TableModule } from "../table-components-module/table.module";
import { InputSuggestionComponent } from './components/input-suggestion/input-suggestion.component';
import { NumberFilterDetailComponent } from './components/filter-detail/number-filter-detail/number-filter-detail.component';
import { StringFilterDetailsComponent } from './components/filter-detail/string-filter-detail/string-filter-details.component';
import { EntityFilterDetailComponent } from './components/filter-detail/entity-filter-detail/entity-filter-detail.component';
import {ModalWindowModuleModule} from "../modal-window-module/modal-window-module.module";
import {ObjectViewModule} from "../object-view-module/object-view.module";
import {FieldsetModuleModule} from "../fieldset-components-module/fieldset-module.module";

@NgModule({
    declarations: [
        StringInputComponent,
        NumberInputComponent,
        EnumInputComponent,
        BooleanInputComponent,
        DateTimeInputComponent,
        PeriodInputComponent,
        EntityInputComponent,
        InputSuggestionComponent,
        NumberFilterDetailComponent,
        StringFilterDetailsComponent,
        EntityFilterDetailComponent
    ],
  exports: [
    StringInputComponent,
    NumberInputComponent,
    BooleanInputComponent,
    DateTimeInputComponent,
    EntityInputComponent,
    PeriodInputComponent,
    EnumInputComponent,
    InputSuggestionComponent,
    EntityFilterDetailComponent,
    StringFilterDetailsComponent,
    NumberFilterDetailComponent
  ],
    imports: [
        CommonModule,
        TableModule,
        ModalWindowModuleModule,
        ObjectViewModule,
        FieldsetModuleModule
    ]
})
export class InputComponentsModule { }
