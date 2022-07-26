import {
  BooleanFilterComponentRangeOperatorType,
  BooleanFilterComponentValue,
  EntityFilterComponentRangeOperatorType,
  EntityFilterComponentValue,
  EnumFilterComponentRangeOperatorType,
  EnumFilterComponentValue,
  FilterComponentValueRange,
  FilterComponentValueUnionOperator,
  NumberFilterComponentRangeOperatorType,
  NumberFilterComponentValue,
  StringFilterComponentRangeOperatorType,
  StringFilterComponentValue
} from "./filter-component-value";
import {HasId} from "../../../service/http/model/pageable";

export abstract class FilterComponentValueBasicImpl<RangesType, ValuesType> {
  ranges: Array<RangesType>;
  values: Array<ValuesType>;
  operator: FilterComponentValueUnionOperator;

  constructor(args?: {ranges: Array<RangesType>, values: Array<ValuesType>, operator: FilterComponentValueUnionOperator}) {
    this.ranges = args && args.ranges ? args.ranges : [];
    this.values = args && args.values ? args.values : [];
    this.operator = args && args.operator ? args.operator: FilterComponentValueUnionOperator.AND;
  }
}

export class BooleanFilterComponentValueImpl extends FilterComponentValueBasicImpl<FilterComponentValueRange<Boolean, BooleanFilterComponentRangeOperatorType>, BooleanFilterComponentValue> implements BooleanFilterComponentValue {
}

export class NumberFilterComponentValueImpl extends FilterComponentValueBasicImpl<FilterComponentValueRange<Number, NumberFilterComponentRangeOperatorType>, NumberFilterComponentValue> implements NumberFilterComponentValue {
}

export class StringFilterComponentValueImpl extends FilterComponentValueBasicImpl<FilterComponentValueRange<String, StringFilterComponentRangeOperatorType>, StringFilterComponentValue> implements StringFilterComponentValue {
}

export class EntityFilterComponentValueImpl<EntityTypeRef> extends FilterComponentValueBasicImpl<FilterComponentValueRange<HasId, EntityFilterComponentRangeOperatorType>, EntityFilterComponentValue<EntityTypeRef>> implements EntityFilterComponentValue<EntityTypeRef> {
}

export class EnumFilterComponentValueImpl<EnumTypeRef> extends FilterComponentValueBasicImpl<FilterComponentValueRange<EnumTypeRef, EnumFilterComponentRangeOperatorType>, EnumFilterComponentValue<EnumTypeRef>> implements EnumFilterComponentValue<EnumTypeRef> {
}
