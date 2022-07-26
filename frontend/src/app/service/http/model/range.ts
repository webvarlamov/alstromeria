import {RangeOperator} from './range-operator.enum';

export interface RangeInterface {
  operator: RangeOperator;
  property: string;
  value1?: any;
  value2?: any;
  values?: any[];
}

export class Range {
  exclude: boolean = false;
  operator: RangeOperator;
  property: string;
  value1?: any;
  value2?: any;
  values?: any[];

  constructor(params: RangeInterface) {
    this.operator = params.operator;
    this.property = params.property;
    this.value1 = params.value1;
    this.value2 = params.value2;
    this.values = params.values;
  }
}
