import {
  PagingAndSortingRemoteRepositoryImpl
} from "../service/http/repository/paging-and-sorting-remote-repository-impl";
import {HasId} from "../service/http/model/pageable";
import {combineLatest, Observable, of} from "rxjs";
import {map, switchMap, take, tap} from "rxjs/operators";
import {
  ColumnPositionChangeRequest
} from "../modules/table-components-module/table/models/changeRequest/column-position-change.request";
import {
  ColumnSizeChangeRequest
} from "../modules/table-components-module/table/components/cell-resize/cell-resize.component";
import {SortChangeRequest} from "../modules/table-components-module/table/models/changeRequest/sort-change-request";
import {
  SelectionChangeRequest
} from "../modules/table-components-module/table/models/changeRequest/selectionChangeRequest";
import {
  PageSizeChangeRequest
} from "../modules/table-components-module/table/models/changeRequest/pageSizeChangeRequest";
import {
  PageNumberChangeRequest
} from "../modules/table-components-module/table/models/changeRequest/pageNumberChangeRequest";
import {ListViewTableStateManager} from "../state/list-view-state/list-view-table-state-manager-impl";
import {
  ListViewFiltersStateData,
  ListViewFiltersStateManager
} from "../state/filter-state/list-view-filters-state-manager-impl";
import {FilterExpression} from "../service/http/model/filter-expression";

export class PagingAndSortingRemoteRepositoryListViewStateManagerImpl<T extends HasId> implements ListViewStateManager {
  public listViewTableStateManager: ListViewTableStateManager;
  public listViewFiltersStateManager: ListViewFiltersStateManager;
  public repository: PagingAndSortingRemoteRepositoryImpl<T>;
  public fetchStrategy: string;
  public filterExpressionBuilder: RemoteRepositoryFilterExpressionBuilder


  constructor(args: {
    listViewTableStateManager: ListViewTableStateManager;
    listViewFiltersStateManager: ListViewFiltersStateManager;
    repository: PagingAndSortingRemoteRepositoryImpl<T>;
    fetchStrategy: string;
    filterExpressionBuilder: RemoteRepositoryFilterExpressionBuilder
  }) {
    this.listViewTableStateManager = args.listViewTableStateManager
    this.listViewFiltersStateManager = args.listViewFiltersStateManager
    this.repository = args.repository;
    this.fetchStrategy = args.fetchStrategy;
    this.filterExpressionBuilder = args.filterExpressionBuilder
  }

  public onColumnMoveChangeRequest($event: ColumnPositionChangeRequest): void {
    this.listViewTableStateManager.changeTableColumns($event.candidates);
  }

  public onColumnSizeChangeRequest($event: ColumnSizeChangeRequest): void  {
    this.listViewTableStateManager.changeTableColumns($event.candidates);
  }

  public onSortChangeRequest($event: SortChangeRequest): void  {
    this.listViewTableStateManager.changeTableSorting($event.candidates);
    this.update()
  }

  public onTableSelectionChangeRequest($event: SelectionChangeRequest): void  {
    this.listViewTableStateManager.changeTableSelected($event.candidates);
  }

  public onPageSizeChangeRequest($event: PageSizeChangeRequest): void  {
    this.listViewTableStateManager.changeTablePage($event.candidate);
    this.update()
  }

  public onPageNumberChangeRequest($event: PageNumberChangeRequest): void  {
    this.listViewTableStateManager.changeTablePage($event.candidate);
    this.update()
  }

  public onDeleteItemsRequest(): void  {
  }

  public update(): void {
    combineLatest([
      this.listViewTableStateManager.getPage(),
      this.listViewTableStateManager.getSorting(),
      this.listViewFiltersStateManager.getListViewFiltersStateData().pipe(
        switchMap((listViewFiltersStateData) => {
          return this.filterExpressionBuilder.build(listViewFiltersStateData)
        })
      )
    ]).pipe(
      tap(args => console.info("Run update...", args)),
      take(1),
      switchMap(([page, sort, filterExpression]) => {
        return this.repository.findAllEntitiesOnPage({
          page,
          sort,
          fetchStrategy: this.fetchStrategy,
          filterExpression
        })
      })
    ).toPromise().then(response => {
      this.listViewTableStateManager.changeTableItems(response.items)
      this.listViewTableStateManager.changeTablePage({
        size: response.size,
        itemsCount: response.itemsCount,
        pagesCount: response.pagesCount,
        page: response.page
      })
    })
  }
}


export interface ListViewStateManager {
  onColumnMoveChangeRequest($event: ColumnPositionChangeRequest): void;
  onColumnSizeChangeRequest($event: ColumnSizeChangeRequest): void;
  onSortChangeRequest($event: SortChangeRequest): void;
  onTableSelectionChangeRequest($event: SelectionChangeRequest): void;
  onPageSizeChangeRequest($event: PageSizeChangeRequest): void;
  onPageNumberChangeRequest($event: PageNumberChangeRequest): void
  onDeleteItemsRequest(): void;
}

export class RemoteRepositoryDefaultFilterExpressionBuilderImpl implements RemoteRepositoryFilterExpressionBuilder {
  build(listViewFiltersStateData: ListViewFiltersStateData): Observable<FilterExpression> {
    return of(FilterExpression.empty())
  }
}

export interface RemoteRepositoryFilterExpressionBuilder {
  build(listViewFiltersStateData: ListViewFiltersStateData): Observable<FilterExpression>
}
