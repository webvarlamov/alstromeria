import {
  BasicFilterExpressionBuilderTypeGraph,
  FilterExpressionBuilderEnumMembersLocalisation,
  FilterExpressionBuilderPropertyLocalisation,
  FilterExpressionBuilderRootObjectTypeName
} from "../config/filter-expression-object-view.config";
import {TypeGraph} from "../../../../object-view-module/components/object-view/model/type.graph";
import {Directive, EventEmitter, Input, Output} from "@angular/core";
import {FilterExpression} from "../../../../../service/http/model/filter-expression";
import {ObjectStateChangeRequest} from "../../../../object-view-module/components/object-view/model/object-state-change.request";
import {FilterStateChangeRequest} from "./filter-state-change-request";

@Directive()
export abstract class FilterDetailComponent {
  @Input()
  public attributeKey: string;

  @Input()
  public filterDetailState: any = new FilterExpression({
    expressions: []
  });

  @Output()
  public onFilterDetailChangeRequestEvent: EventEmitter<FilterStateChangeRequest> = new EventEmitter<FilterStateChangeRequest>();

  @Input()
  public typeGraph: TypeGraph & any = BasicFilterExpressionBuilderTypeGraph;
  @Input()
  public propertyNameLocalisation: any = FilterExpressionBuilderPropertyLocalisation;
  @Input()
  public rootObjectTypeName: string = FilterExpressionBuilderRootObjectTypeName;
  @Input()
  public enumMembersLocalisation: any = FilterExpressionBuilderEnumMembersLocalisation;

  public onFilterDetailChangeRequestEventEmitted($event: ObjectStateChangeRequest) {
    const event: FilterStateChangeRequest = {...$event, typeGraph: this.typeGraph, attributeKey: this.attributeKey};
    this.onFilterDetailChangeRequestEvent.emit(event);
  }
}

