import {FilterExpression} from "../model/filter-expression";
import {Observable} from "rxjs";
import {FilterValueConfigTuple} from "../../../state/filter-state/list-view-filters.state";

export interface FilterExpressionBuilder {
  build(filtersByAttributeKey: { [attributeKey: string]: FilterValueConfigTuple }): Observable<FilterExpression>;
}
