import { EditTableRowItemCellInputComponentEvent } from "../../../../modules/table-components-module/table/cell-template-components/edit-table-row-item-cell-input/edit-table-row-item-cell-input.component";
import { TableCellDynamicComponentEventHandler } from "../../../../modules/table-components-module/table/models/common/table-cell-dynamic-component-event-handler";
import { TableRow } from "../../../../modules/table-components-module/table/models/dataModels/tableRow";
import { TableColumn } from "../../../../modules/table-components-module/table/models/dataModels/tableColumn";

export class EditTableRowItemCellInputComponentEventHandler extends TableCellDynamicComponentEventHandler {
  constructor() {
    super();
  }

  handleEvent(
    tableRow: TableRow,
    tableColumn: TableColumn,
    $event: EditTableRowItemCellInputComponentEvent
  ) {
  }
}
