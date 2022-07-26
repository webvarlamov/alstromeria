import {FilterValuesByAttributeKey} from "../../view/view/component/list-view/filter-values-by-attribute.key";
import {FilterConfigByAttributeKey} from "../../view/view/component/list-view/filter-config-by-attribute.key";

export interface ListViewFiltersInitialState<T> {
    listViewFilterValuesByAttributeKey?: FilterValuesByAttributeKey<T>,
    listViewFilterConfigByAttributeKey?: FilterConfigByAttributeKey
}
