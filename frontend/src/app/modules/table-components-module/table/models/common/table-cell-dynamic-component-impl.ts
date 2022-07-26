import {TableCellDynamicComponent} from "./table-cell-dynamic-component";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {TableColumn} from "../dataModels/tableColumn";
import {TableRow} from "../dataModels/tableRow";
import {TableCellDynamicComponentEventHandler} from "./table-cell-dynamic-component-event-handler";
import {map} from "rxjs/operators";

export class TableCellDynamicComponentImpl implements TableCellDynamicComponent{
  tableColumn$: BehaviorSubject<TableColumn> = new BehaviorSubject<TableColumn>(null);
  tableRow$: BehaviorSubject<TableRow> = new BehaviorSubject<TableRow>(null);
  eventHandler?: TableCellDynamicComponentEventHandler;

  value$: Observable<any> = combineLatest([this.tableRow$, this.tableColumn$]).pipe(
    map(([row, column]) => {
      return row?.data[column?.dataField]
    })
  )

  public emitEvent($event: any): void {
    console.assert(this.eventHandler != null, "If you want emit events from TableCellDynamicComponent," +
      "TableCellDynamicComponentEventHandler must be declared in TableColumn!",  this)
    this.eventHandler.handleEvent(this.tableRow$.getValue(), this.tableColumn$.getValue(), $event)
  }
}
