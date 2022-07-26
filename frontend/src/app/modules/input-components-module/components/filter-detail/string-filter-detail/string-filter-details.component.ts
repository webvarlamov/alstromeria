import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TypeGraph} from "../../../../object-view-module/components/object-view/model/type.graph";
import {
  NumberFilterComponentRangeOperatorType,
  StringFilterComponentRangeOperatorType
} from "../../../../filter-components-module/models/filter-component-value";
import {BasicFilterExpressionBuilderTypeGraph} from "../config/filter-expression-object-view.config";
import {FilterDetailComponent} from "../common/filter-detail-component";
import {StringFilterComponentValueImpl} from "../../../../filter-components-module/models/filter-component-value-basic-impl";

@Component({
  selector: 'app-string-filter-details',
  templateUrl: '../common/filter-details.component.html',
  styleUrls: ['./string-filter-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StringFilterDetailsComponent extends FilterDetailComponent implements OnInit {

  public ngOnInit(): void {
  }

  public typeGraph: TypeGraph & any = {
    "Value": {
      ranges: 'Array<Range>',
      values: 'Array<Value>',
      operator: 'Enum<FilterExpressionOperator>'
    },
    "Range": {
      operator: 'Enum<RangeOperator>',
      value1: 'string',
      value2: 'string',
      values: 'string'
    },
    "FilterExpressionOperator": {
      AND: 'AND',
      OR: 'OR'
    },
    "RangeOperator": {
      EQ: 'EQ',
      NE: 'NE',
      LE: 'LE',
      GE: 'GE',
      LT: 'LT',
      GT: 'GT',
      IN: 'IN',
      BT: 'BT',
      LIKE: 'LIKE',
      ISMEMBER: 'ISMEMBER',
      STARTWITH: 'STARTWITH',
      ENDWITH: 'ENDWITH'
    }
  };
  public rootObjectTypeName: string = "Value";


}
