import {SortOrder, TableSort} from "../dataModels/tableSort";

export interface SortChangeRequest {
  enabled: boolean;
  dataField: string;
  sortOrder: SortOrder;
  candidates?: Array<TableSort>
}
