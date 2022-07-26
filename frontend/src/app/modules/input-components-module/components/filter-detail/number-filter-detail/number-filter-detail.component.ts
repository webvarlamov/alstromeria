import {Component, OnInit} from '@angular/core';
import { FilterDetailComponent } from "../common/filter-detail-component";
import {TypeGraph} from "../../../../object-view-module/components/object-view/model/type.graph";
import {BasicFilterExpressionBuilderTypeGraph} from "../config/filter-expression-object-view.config";
import {
  NumberFilterComponentRangeOperatorType,
} from "../../../../filter-components-module/models/filter-component-value";

@Component({
  selector: 'app-number-master-input',
  templateUrl: '../common/filter-details.component.html',
  styleUrls: ['./number-filter-detail.component.css']
})
export class NumberFilterDetailComponent extends FilterDetailComponent implements OnInit {

  ngOnInit(): void {
  }

  public typeGraph: TypeGraph & any = {
    ...BasicFilterExpressionBuilderTypeGraph,
    "RangeOperator": NumberFilterComponentRangeOperatorType,
    "Range": Object.assign({},
      BasicFilterExpressionBuilderTypeGraph.Range,
      {
        value1: "number",
        value2: "number",
        values: "Array<number>",
      }
    )
  };

}
