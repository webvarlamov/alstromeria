import {ListViewTableState} from "./list-view-table-state";
import {PagingAndSortingRepository} from "../../service/http/repository/paging-and-sorting-repository";
import {FilterExpression} from "../../service/http/model/filter-expression";
import {combineLatest, of} from "rxjs";
import {ResponsePage} from "../../service/http/model/response-page";
import {HasId} from "../../service/http/model/pageable";
import {switchMap, take} from "rxjs/operators";
import {RemoteFilterableListViewStateManager} from "./remote-filterable-list-view-state-manager";
import {ListViewFiltersStateManagerImpl} from "../filter-state/list-view-filters-state-manager-impl";
import {FilterExpressionBuilder} from "../../service/http/service/filter-expression-builder";
import {SuggestionFilterableListViewStateManager} from "./suggestion-filterable-list-view-state-manager";
import {SuggestionOwnerInputEvent} from "../../modules/input-components-module/components/input-component/input.component";

export class SuggestionValueRemoteFilterableListViewStateManager extends RemoteFilterableListViewStateManager implements SuggestionFilterableListViewStateManager {
  private attributeKey: string;

  constructor(
    args: {
      listViewTableState: ListViewTableState;
      repository: PagingAndSortingRepository<any>;
      fetchStrategy?: string;
      attributeKey: string;
      listViewFiltersStateManager: ListViewFiltersStateManagerImpl,
      filterExpressionBuilder: FilterExpressionBuilder
    }) {
    super(args);
    this.attributeKey = args.attributeKey;
  }

  public loadFromRemote(): Promise<ResponsePage<HasId>> {
    return combineLatest([
      this.listViewTableState.tablePage$,
      this.listViewTableState.tableSorting$,
      this.listViewFiltersStateManager.filtersByAttributeKey$.pipe(
        switchMap(filtersByAttributeKey => {
          return this.filterExpressionBuilder ?
            this.filterExpressionBuilder.build(filtersByAttributeKey)
            : of(FilterExpression.empty());
        }),
        take(1)
      )
    ]).pipe(
      take(1),
      switchMap(([page, sort, filterExpression]) => {
        return this.repository.findAllSuggestionsOnPage({
          page: page,
          sort: sort,
          attributeKey: this.attributeKey,
          filterExpression: filterExpression
        })
      })
    ).toPromise();
  }

  public onSuggestionOwnerValueChangeEvent(args: SuggestionOwnerInputEvent): void {
    const attributeKey = args.owner.config?.attributeKey;
    this.listViewFiltersStateManager.updateValueByAttributeKey(attributeKey, args.value)
  }
}
