import {ObjectStateChangeRequest} from "../../../../object-view-module/components/object-view/model/object-state-change.request";
import {TypeGraph} from "../../../../object-view-module/components/object-view/model/type.graph";

export interface FilterStateChangeRequest extends ObjectStateChangeRequest {
  attributeKey: string;
  typeGraph: TypeGraph;
}
