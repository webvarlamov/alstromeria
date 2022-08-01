import {ListViewFiltersState} from "./list-view-filters.state";
import {combineLatest, Observable} from "rxjs";
import {map, take} from "rxjs/operators";
import {FilterValuesByAttributeKey} from "../../view/view/component/list-view/filter-values-by-attribute.key";
import {FilterConfigByAttributeKey} from "../../view/view/component/list-view/filter-config-by-attribute.key";
import {FilterComponentValue} from "../../modules/filter-components-module/models/filter-component-value";
import {FilterComponentConfig} from "../../view/view/component/list-view/filter-config.interface";
import * as objectPath from "object-path";

export interface ObjectOfMappedFilterStates {
  [key: string]: {
    value?: FilterComponentValue<any, any, any>,
    config?: FilterComponentConfig
  }
}

export class ListViewFiltersStateManagerImpl implements ListViewFiltersStateManager {
  public listViewFilterState: ListViewFiltersState;
  public arrayOfMappedFilterStates$: Observable<any>;
  public objectOfMappedFilterStates$: Observable<ObjectOfMappedFilterStates>;

  constructor(args: {
    listViewFiltersState?: ListViewFiltersState
  }) {
    this.listViewFilterState = args.listViewFiltersState != null ? args.listViewFiltersState : new ListViewFiltersState();

    this.arrayOfMappedFilterStates$ = combineLatest([
      this.listViewFilterState.filterConfigByAttributeKey$,
      this.listViewFilterState.filterValuesByAttributeKey$
    ]).pipe(
      map(([filterConfigByAttributeKey, filterValuesByAttributeKey]) => {
        return Object.keys(filterConfigByAttributeKey).map(key => {
          return {
            key,
            config: filterConfigByAttributeKey[key],
            value: filterValuesByAttributeKey[key]
          }
        })
      })
    )

    this.objectOfMappedFilterStates$ = combineLatest([
      this.listViewFilterState.filterConfigByAttributeKey$,
      this.listViewFilterState.filterValuesByAttributeKey$
    ]).pipe(
      map(([filterConfigByAttributeKey, filterValuesByAttributeKey]) => {
        const result: ObjectOfMappedFilterStates = {};
        Object.keys(filterConfigByAttributeKey).map(key => {
          result[key] = {
            config: filterConfigByAttributeKey[key],
            value: filterValuesByAttributeKey[key]
          }
        });

        return result;
      })
    )
  }

  public getListViewFiltersStateData(): Observable<ListViewFiltersStateData> {
    return combineLatest([
      this.listViewFilterState.filterConfigByAttributeKey$,
      this.listViewFilterState.filterValuesByAttributeKey$
    ]).pipe(
      take(1),
      map(([filterConfigByAttributeKey, filterValuesByAttributeKey]) => {
        return {filterConfigByAttributeKey, filterValuesByAttributeKey}
      }),
    )
  }

  public getListViewFilterState(): ListViewFiltersState {
    return this.listViewFilterState;
  }

  public setFilterValuesByAttributeKey(attributeKey: string, value: FilterValuesByAttributeKey<any>): void {
    const currentValue = this.listViewFilterState.filterValuesByAttributeKey$.getValue();
    let filterValuesByAttributeKey = objectPath.set(currentValue, attributeKey, value);
    this.listViewFilterState.filterValuesByAttributeKey$.next(filterValuesByAttributeKey)
  }
}

export interface ListViewFiltersStateManager {
  getListViewFiltersStateData(): Observable<ListViewFiltersStateData>;
  getListViewFilterState(): ListViewFiltersState;
  setFilterValuesByAttributeKey(attributeKey: string, value: FilterValuesByAttributeKey<any>): void;
}

export interface ListViewFiltersStateData {
  filterConfigByAttributeKey: FilterConfigByAttributeKey;
  filterValuesByAttributeKey: FilterValuesByAttributeKey<any>;
}
