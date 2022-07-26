import {IndexRelativePosition} from "../../components/coll-dragger/coll-drag.service";
import {TableColumn} from "../dataModels/tableColumn";

export interface ColumnPositionChangeRequest {
    nextPosition: IndexRelativePosition;
    column: TableColumn,
    candidates?: Array<TableColumn>
}
