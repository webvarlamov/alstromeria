import {TableRow} from "../dataModels/tableRow";
import {TableColumn} from "../dataModels/tableColumn";
import {BehaviorSubject} from "rxjs";
import {TableCellDynamicComponentEventHandler} from "./table-cell-dynamic-component-event-handler";

export interface TableCellDynamicComponent {
  tableRow$: BehaviorSubject<TableRow>;
  tableColumn$: BehaviorSubject<TableColumn>;
  eventHandler?: TableCellDynamicComponentEventHandler;
}
