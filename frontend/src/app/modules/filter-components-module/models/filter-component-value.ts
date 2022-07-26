import {HasId} from "../../../service/http/model/pageable";

export enum NumberFilterComponentRangeOperatorType {
  EQ = 'EQ',
  NE = 'NE',
  LE = 'LE',
  GE = 'GE',
  LT = 'LT',
  GT = 'GT',
  IN = 'IN',
  BT = 'BT',
  ISMEMBER = 'ISMEMBER',
}

export enum StringFilterComponentRangeOperatorType {
  EQ = 'EQ',
  NE = 'NE',
  LIKE = 'LIKE',
  IN = 'IN',
  ISMEMBER = 'ISMEMBER',
  STARTWITH = 'STARTWITH',
  ENDWITH = 'ENDWITH'
}

export enum EntityFilterComponentRangeOperatorType {
  EQ = 'EQ',
  IN = 'IN',
  ISMEMBER = 'ISMEMBER',
}

export enum EnumFilterComponentRangeOperatorType {
  EQ = 'EQ',
  IN = 'IN',
  ISMEMBER = 'ISMEMBER',
}

export enum BooleanFilterComponentRangeOperatorType {
  EQ = 'EQ',
  NE = 'NE',
}

export enum FilterComponentValueUnionOperator {
  AND= "AND",
  OR = "OR"
}


export interface FilterComponentValueRange<RangeValueType, FilterComponentValueRangeOperatorType> {
  exclude?: boolean;
  operator?: FilterComponentValueRangeOperatorType,
  value1?: RangeValueType;
  value2?: RangeValueType;
  values?: Array<RangeValueType>
}

export interface FilterComponentValue<ValuesType, RangesValueType, RangeOperatorType> {
  values: Array<ValuesType>;
  ranges: Array<FilterComponentValueRange<RangesValueType, RangeOperatorType>>;
  operator: FilterComponentValueUnionOperator;
}

export interface NumberFilterComponentValue extends FilterComponentValue<NumberFilterComponentValue, Number, NumberFilterComponentRangeOperatorType> {
}

export interface StringFilterComponentValue extends FilterComponentValue<StringFilterComponentValue, String, StringFilterComponentRangeOperatorType> {
}

export interface EnumFilterComponentValue<EnumTypeRef> extends FilterComponentValue<EnumFilterComponentValue<EnumTypeRef>, EnumTypeRef, EnumFilterComponentRangeOperatorType> {
}

export interface EntityFilterComponentValue<EntityTypeRef> extends FilterComponentValue<EntityFilterComponentValue<EntityTypeRef>, HasId, EntityFilterComponentRangeOperatorType> {
}

export interface BooleanFilterComponentValue extends FilterComponentValue<BooleanFilterComponentValue, Boolean, BooleanFilterComponentRangeOperatorType> {
}
