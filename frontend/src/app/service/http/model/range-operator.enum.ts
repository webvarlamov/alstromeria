export enum RangeOperator {
  EQ = 'EQ',
  NE = 'NE',
  LE = 'LE',
  GE = 'GE',
  LT = 'LT',
  GT = 'GT',
  IN = 'IN',
  BT = 'BT',
  LIKE = 'LIKE',
  ISMEMBER = 'ISMEMBER',
  STARTWITH = 'STARTWITH',
  ENDWITH = 'ENDWITH'
}

export class RangeOperatorsMetadata {
  icon: string;
  localisation: string;
}
