import {FilterExpression} from "../../../../service/http/model/filter-expression";
import {FilterComponentValue} from "../../../../modules/filter-components-module/models/filter-component-value";

export class FilterValuesByAttributeKey<T> {
    [attributeKey: string]: FilterComponentValue<any, any, any>
}
