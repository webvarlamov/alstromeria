import {HasId} from "../../../../../service/http/model/pageable";

export interface SelectionChangeRequest {
    currentSelectedEntities: Array<HasId>;
    currentDeselectedEntities: Array<HasId>;
    candidates: Array<HasId>;
    checked: boolean;
}
