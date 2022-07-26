import {ListViewTableState} from "./list-view-table-state";
import {PagingAndSortingRepository} from "../../service/http/repository/paging-and-sorting-repository";
import {combineLatest, of} from "rxjs";
import {Page} from "../../service/http/model/page";
import {TableSort} from "../../modules/table-components-module/table/models/dataModels/tableSort";
import {ResponsePage} from "../../service/http/model/response-page";
import {HasId} from "../../service/http/model/pageable";
import {map, switchMap, take, tap} from "rxjs/operators";
import {FilterableListViewTableStateManager} from "./filterable-list-view-table-state-manager";
import {ListViewFiltersStateManagerImpl} from "../filter-state/list-view-filters-state-manager-impl";
import {FilterExpressionBuilder} from "../../service/http/service/filter-expression-builder";
import {FilterExpression} from "../../service/http/model/filter-expression";

export class RemoteFilterableListViewStateManager extends FilterableListViewTableStateManager {
  public repository: PagingAndSortingRepository<any>;
  public fetchStrategy: string;
  public filterExpressionBuilder: FilterExpressionBuilder;

  constructor(
    args: {
      listViewTableState: ListViewTableState,
      listViewFiltersStateManager: ListViewFiltersStateManagerImpl,
      repository: PagingAndSortingRepository<any>,
      fetchStrategy?: string,
      filterExpressionBuilder: FilterExpressionBuilder
    }
  ) {
    super(args);
    this.repository = args.repository;
    this.fetchStrategy = args.fetchStrategy;
    this.filterExpressionBuilder = args.filterExpressionBuilder;
  }

  public changeTablePage(page: Page): void {
    this.listViewTableState.nextTablePage(page);

    this.updateItems().then();
  }

  public changeTableSorting(tableSorting: Array<TableSort>) {
    this.listViewTableState.nextTableSorting(tableSorting);

    this.updateItems().then();
  }

  public loadFromRemote(): Promise<ResponsePage<HasId>> {
    return null;
    // return combineLatest([
    //   this.listViewTableState.tablePage$,
    //   this.listViewTableState.tableSorting$,
    //   this.listViewFiltersStateManager.filtersByAttributeKey$.pipe(
    //     switchMap(filtersByAttributeKey => {
    //       return this.filterExpressionBuilder ?
    //         this.filterExpressionBuilder.build(filtersByAttributeKey)
    //         : of(FilterExpression.empty());
    //     }),
    //     take(1)
    //   )
    // ]).pipe(
    //   take(1),
    //   switchMap(([page, sort, filterExpression]) => this.repository.findAllEntitiesOnPage({
    //     page: page,
    //     sort: sort,
    //     fetchStrategy: this.fetchStrategy,
    //     filterExpression: filterExpression
    //   }))
    // ).toPromise();
  }

  public updateItems(): Promise<boolean> {
    return this.loadFromRemote().then(responsePage => {
      this.listViewTableState.nextTableItemsList(responsePage.items);
      this.listViewTableState.nextTablePage({
        size: responsePage.size,
        page: responsePage.page,
        pagesCount: responsePage.pagesCount,
        itemsCount: responsePage.itemsCount,
      })

      return true;
    })
  }

  public deleteSelectedTableItems(): Promise<any> {
    return this.listViewTableState.tableSelectedList$.pipe(
      take(1),
      switchMap(selectedItems => {
        return this.repository.deleteAllEntities({entities: selectedItems})
      }),
      switchMap(() => {
        return this.updateItems();
      })
    ).toPromise();
  }
}
