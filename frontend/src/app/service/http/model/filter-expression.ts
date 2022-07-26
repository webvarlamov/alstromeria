import {Range} from './range';

export class FilterExpression {
  public expressions?: FilterExpression[];
  public operator?: FilterExpressionOperator;
  public ranges?: Range[];
  public exclude?: boolean;

  constructor(params: FilterExpressionInterface) {
    this.operator = params.operator;
    this.expressions = params.expressions;
    this.ranges = params.ranges;
  }

  public static empty(): FilterExpression {
    return new FilterExpression({
      operator: FilterExpressionOperator.AND,
      expressions: [],
      ranges: []
    })
  }
}

export interface FilterExpressionInterface {
  operator?: FilterExpressionOperator;
  expressions?: FilterExpression[];
  ranges?: Range[];
}

export enum FilterExpressionOperator {
  AND = 'AND', OR = 'OR', DEFAULT = 'DEFAULT'
}
