import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from "./table/table.component";
import { CellResizeComponent } from './table/components/cell-resize/cell-resize.component';
import { CollDraggerComponent } from './table/components/coll-dragger/coll-dragger.component';
import { ColumnControlsComponent } from './table/components/column-controlls/column-controls.component';
import { NullValueCellDisplayComponent } from './table/cell-template-components/null-value-cell-display/null-value-cell-display.component';
import { CellDynamicComponentResolver } from './table/components/cell-template-resolver/cell-dynamic-component-resolver.component';
import { EditTableRowItemCellButtonComponent } from './table/cell-template-components/edit-table-row-item-cell-button/edit-table-row-item-cell-button.component';
import { EditTableRowItemCellInputComponent } from './table/cell-template-components/edit-table-row-item-cell-input/edit-table-row-item-cell-input.component';

@NgModule({
  declarations: [
    TableComponent,
    CellResizeComponent,
    CollDraggerComponent,
    ColumnControlsComponent,
    NullValueCellDisplayComponent,
    CellDynamicComponentResolver,
    EditTableRowItemCellButtonComponent,
    EditTableRowItemCellInputComponent,
  ],
  exports: [
    TableComponent
  ],
  imports: [
    CommonModule
  ],
  providers: []
})
export class TableModule { }
