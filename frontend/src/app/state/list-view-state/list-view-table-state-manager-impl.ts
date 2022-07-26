import {ListViewTableState} from "./list-view-table-state";
import {take, tap} from "rxjs/operators";
import {combineLatest, Observable, of, throwError} from "rxjs";
import {HasId} from "../../service/http/model/pageable";
import {Page} from "../../service/http/model/page";
import {TableSort} from "../../modules/table-components-module/table/models/dataModels/tableSort";
import {TableColumn} from "../../modules/table-components-module/table/models/dataModels/tableColumn";

export class ListViewTableStateManagerImpl implements ListViewTableStateManager {
  public listViewTableState: ListViewTableState;

  constructor(listViewTableState: ListViewTableState) {
    this.listViewTableState = listViewTableState;
  }

  public changeTablePage(page: Page): void {
    this.listViewTableState.nextTablePage(page);
  }

  public changeTableItems(tableItemsList: Array<HasId>): void {
    this.listViewTableState.nextTableItemsList(tableItemsList);
  }

  public changeTableSorting(tableSorting: Array<TableSort>): void {
    this.listViewTableState.nextTableSorting(tableSorting);
  }

  public changeTableSelected(tableSelectedList: Array<HasId>): void {
    this.listViewTableState.nextTableSelectedList(tableSelectedList);
  }

  public changeTableColumns(tableColumnsList: Array<TableColumn>): void {
    this.listViewTableState.nextTableColumnsList(tableColumnsList);
  }

  public getPage(): Observable<Page> {
    return this.listViewTableState.tablePage$
  }

  public getSorting(): Observable<TableSort[]> {
    return this.listViewTableState.tableSorting$
  }

  public deleteSelectedTableItems(): Promise<any> {
    return combineLatest([
      this.listViewTableState.tableSelectedList$,
      this.listViewTableState.tableItemsList$
    ]).pipe(
      take(1),
      tap(([selectedItems, tableItems]) => {
        const tableItemsCandidates = tableItems.filter(ti => selectedItems.find(si => si.id == ti.id) == null);
        this.listViewTableState.nextTableItemsList(tableItemsCandidates);
        this.listViewTableState.nextTableSelectedList([]);
      })
    ).toPromise();
  }
}

export interface ListViewTableStateManager {
  changeTablePage(page: Page): void
  changeTableItems(tableItemsList: Array<HasId>): void
  changeTableSorting(tableSorting: Array<TableSort>): void
  changeTableSelected(tableSelectedList: Array<HasId>): void
  changeTableColumns(tableColumnsList: Array<TableColumn>): void
  deleteSelectedTableItems(): Promise<any>

  getPage(): Observable<Page>;
  getSorting(): Observable<TableSort[]>;
}

