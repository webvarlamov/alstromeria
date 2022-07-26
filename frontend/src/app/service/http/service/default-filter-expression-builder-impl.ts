import {FilterExpressionBuilder} from "./filter-expression-builder";
import {Observable, of, throwError} from "rxjs";
import {FilterExpression, FilterExpressionOperator} from "../model/filter-expression";
import {FilterValueConfigTuple} from "../../../state/filter-state/list-view-filters.state";
import {Range} from "../model/range";
import {RangeOperator} from "../model/range-operator.enum";

export class DefaultFilterExpressionBuilderImpl implements FilterExpressionBuilder{

  public build(filtersByAttributeKey: { [attributeKey: string]: FilterValueConfigTuple }): Observable<FilterExpression> {
    const ranges = Object.entries(filtersByAttributeKey).map(([attributeKey, entry]) => {
      const operator: RangeOperator = entry.config?.operator;

      if (operator == null) {
        console.error('Filter component config RangeOperator value is Null!', entry);
        return null;
      } else {

        const range = new Range({
          operator: operator,
          property: attributeKey,
        });

        if (operator == RangeOperator.ISMEMBER || operator == RangeOperator.IN) {
          range.values = entry.value as Array<string | number | null>;
        } else if (operator == RangeOperator.BT) {
          /* TODO: ХЗ как обработать? */
        } else {
          range.value1 = entry.value as string | number | null;
        }

        return range;
      }
    }).filter(range => range != null);

    const filterExpression = new FilterExpression({
      operator: FilterExpressionOperator.AND,
      ranges: ranges,
    });

    return of(filterExpression);
  }
}
