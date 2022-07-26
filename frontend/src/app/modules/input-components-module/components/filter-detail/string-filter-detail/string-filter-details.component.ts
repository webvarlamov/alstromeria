import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TypeGraph} from "../../../../object-view-module/components/object-view/model/type.graph";
import {FilterDetailComponent} from "../common/filter-detail-component";
import {
  FilterComponentValueUnionOperator,
  StringFilterComponentRangeOperatorType
} from "../../../../filter-components-module/models/filter-component-value";

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
      values: 'Array<string>'
    },
    "FilterExpressionOperator": {...FilterComponentValueUnionOperator},
    "RangeOperator": {...StringFilterComponentRangeOperatorType}
  };
  public rootObjectTypeName: string = "Value";


}
