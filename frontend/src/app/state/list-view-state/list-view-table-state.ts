import {BehaviorSubject} from "rxjs";
import {HasId} from "../../service/http/model/pageable";
import {TableColumn} from "../../modules/table-components-module/table/models/dataModels/tableColumn";
import {TableSort} from "../../modules/table-components-module/table/models/dataModels/tableSort";
import {Page} from "../../service/http/model/page";
import {ListViewTableInitialState} from "./list-view-table-initial-state";

export class ListViewTableState {
  public tableItemsList$: BehaviorSubject<Array<HasId>>;
  public tableSelectedList$: BehaviorSubject<Array<HasId>>;
  public tableColumns$: BehaviorSubject<Array<TableColumn>>;
  public tableSorting$: BehaviorSubject<Array<TableSort>>;
  public tablePage$: BehaviorSubject<Page>;
  public tableShowLoaderIndicator$: BehaviorSubject<boolean>;

  public nextTableItemsList(tableItemsList: Array<HasId>): void {
    this.tableItemsList$.next(tableItemsList);
  }

  public nextTableSelectedList(tableSelectedList: Array<HasId>): void {
    this.tableSelectedList$.next(tableSelectedList)
  }

  public nextTableColumnsList(tableColumns: Array<TableColumn>): void {
    this.tableColumns$.next(tableColumns)
  }

  public nextTableSorting(tableSorting: Array<TableSort>): void {
    this.tableSorting$.next(tableSorting)
  }

  public nextTablePage(tablePage: Page): void {
    this.tablePage$.next(tablePage)
  }

  constructor(initialState?: ListViewTableInitialState) {
    this.tableItemsList$ = new BehaviorSubject<Array<HasId>>(
      initialState?.tableItemsList != null ? initialState?.tableItemsList : []
    );
    this.tableSelectedList$ = new BehaviorSubject<Array<HasId>>(
      initialState?.tableSelectedList != null ? initialState?.tableSelectedList : []
    );
    this.tableColumns$ = new BehaviorSubject<Array<TableColumn>>(
      initialState?.tableColumns != null ? initialState?.tableColumns : []
    );
    this.tableSorting$ = new BehaviorSubject<Array<TableSort>>(
      initialState?.tableSorting != null ? initialState.tableSorting : []
    );
    this.tablePage$ = new BehaviorSubject<Page>(
      initialState?.tablePage != null ? initialState.tablePage : null
    )
    this.tableShowLoaderIndicator$ = new BehaviorSubject<boolean>(
      initialState?.tableShowLoaderIndicator != null ? initialState?.tableShowLoaderIndicator : false
    );
  }
}
