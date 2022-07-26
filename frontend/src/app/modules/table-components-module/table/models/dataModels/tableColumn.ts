import {Type} from "@angular/core";
import {TableCellDynamicComponent} from "../common/table-cell-dynamic-component";
import {TableCellDynamicComponentEventHandler} from "../common/table-cell-dynamic-component-event-handler";

export interface TableColumn {
    index?: number
    id: string;
    dataField: string;
    caption?: string;
    width?: string;
    dynamicCellComponent?: Type<TableCellDynamicComponent>;
    dynamicCellComponentEventHandler?: TableCellDynamicComponentEventHandler
}
