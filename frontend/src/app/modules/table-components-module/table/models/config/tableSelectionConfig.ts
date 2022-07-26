import {SelectionMode} from "./selectionMode";

export interface TableSelectionConfig {
    useSelection: boolean;
    columnWidth: string;
    sticky: boolean;
    selectionMode: SelectionMode;
}
