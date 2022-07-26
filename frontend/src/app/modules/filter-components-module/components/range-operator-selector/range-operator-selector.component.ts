import { Component, OnInit } from '@angular/core';
import {RangeOperator} from "../../../../service/http/model/range-operator.enum";

@Component({
  selector: 'range-operator-selector',
  templateUrl: './range-operator-selector.component.html',
  styleUrls: ['./range-operator-selector.component.css']
})
export class RangeOperatorSelectorComponent implements OnInit {
  public rangeOperatorMetadata = new Map(
    [
      [RangeOperator.EQ, {icon: 'EQ'}],
      [RangeOperator.NE, {icon: 'NE'}],
      [RangeOperator.LE, {icon: 'LE'}],
      [RangeOperator.GE, {icon: 'GE'}],
      [RangeOperator.LT, {icon: 'LT'}],
      [RangeOperator.GT, {icon: 'GT'}],
      [RangeOperator.IN, {icon: 'IN'}],
      [RangeOperator.BT, {icon: 'BT'}],
      [RangeOperator.LIKE, {icon: 'LK'}],
      [RangeOperator.ISMEMBER, {icon: 'IM'}],
      [RangeOperator.STARTWITH, {icon: 'SW'}],
      [RangeOperator.ENDWITH, {icon: 'EW'}],
    ]
  )

  public selectedRangeOperator: RangeOperator;

  constructor() { }

  ngOnInit(): void {
  }

}


// export enum RangeOperator {
//   EQ = 'EQ',
//   NE = 'NE',
//   LE = 'LE',
//   GE = 'GE',
//   LT = 'LT',
//   GT = 'GT',
//   IN = 'IN',
//   BT = 'BT',
//   LIKE = 'LIKE',
//   ISMEMBER = 'ISMEMBER',
//   STARTWITH = 'STARTWITH',
//   ENDWITH = 'ENDWITH'
// }
