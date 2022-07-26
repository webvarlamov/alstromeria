import {TableRow} from "../dataModels/tableRow";
import {TableColumn} from "../dataModels/tableColumn";

export abstract class TableCellDynamicComponentEventHandler {
  abstract handleEvent(tableRow: TableRow, tableColumn: TableColumn, $event: any): void;
}
