import {BehaviorSubject} from "rxjs";
import {ListViewFiltersInitialState} from "./list-view-filters-initial.state";
import {FilterValuesByAttributeKey} from "../../view/view/component/list-view/filter-values-by-attribute.key";
import {FilterConfigByAttributeKey} from "../../view/view/component/list-view/filter-config-by-attribute.key";
import {FilterComponentConfigImpl} from "../../view/view/component/list-view/filter-component-config.impl";

export class ListViewFiltersState {
  public filterValuesByAttributeKey$: BehaviorSubject<FilterValuesByAttributeKey<any>>;
  public filterConfigByAttributeKey$: BehaviorSubject<FilterConfigByAttributeKey>;

  constructor(initialState?: ListViewFiltersInitialState<any>) {
    this.filterValuesByAttributeKey$ = new BehaviorSubject(initialState?.listViewFilterValuesByAttributeKey ? initialState.listViewFilterValuesByAttributeKey : {})
    this.filterConfigByAttributeKey$ = new BehaviorSubject(initialState?.listViewFilterConfigByAttributeKey ? initialState.listViewFilterConfigByAttributeKey : {})
  }
}

export class FilterValueConfigTuple {
  value: any;
  config: FilterComponentConfigImpl;
}
