import {HasId} from "../../service/http/model/pageable";
import {TableColumn} from "../../modules/table-components-module/table/models/dataModels/tableColumn";
import {TableSort} from "../../modules/table-components-module/table/models/dataModels/tableSort";
import {Page} from "../../service/http/model/page";

export interface ListViewTableInitialState {
    tableItemsList?: Array<HasId & any>,
    tableSelectedList?: Array<HasId>,
    tableColumns?: Array<TableColumn>,
    tableSorting?: Array<TableSort>,
    tablePage?: Page,
    tableShowLoaderIndicator?: boolean
}
