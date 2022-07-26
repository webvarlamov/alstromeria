import {Component, Input, OnInit} from '@angular/core';
import {TableSelectionConfig} from "../../../table-components-module/table/models/config/tableSelectionConfig";
import {SelectionMode} from "../../../table-components-module/table/models/config/selectionMode";
import {
  ColumnPositionChangeRequest
} from "../../../table-components-module/table/models/changeRequest/column-position-change.request";
import {ColumnSizeChangeRequest} from "../../../table-components-module/table/components/cell-resize/cell-resize.component";
import {SortChangeRequest} from "../../../table-components-module/table/models/changeRequest/sort-change-request";
import {SelectionChangeRequest} from "../../../table-components-module/table/models/changeRequest/selectionChangeRequest";
import {PageSizeChangeRequest} from "../../../table-components-module/table/models/changeRequest/pageSizeChangeRequest";
import {PageNumberChangeRequest} from "../../../table-components-module/table/models/changeRequest/pageNumberChangeRequest";
import {InputComponent, SuggestionOwnerInputEvent} from "../input-component/input.component";
import {TableRowClickEvent} from "../../../table-components-module/table/models/event/table-row-click-event";
import {ListViewTableStateManagerImpl} from "../../../../state/list-view-state/list-view-table-state-manager-impl";
import {
  SuggestionFilterableListViewStateManager
} from "../../../../state/list-view-state/suggestion-filterable-list-view-state-manager";
import {InputSuggestionEventType} from "../input-component/suggestions.directive";

@Component({
  selector: 'app-input-suggestion',
  templateUrl: './input-suggestion.component.html',
  styleUrls: ['./input-suggestion.component.css']
})
export class InputSuggestionComponent implements OnInit {
  public owner: InputComponent<any, any>;

  @Input()
  public stateManager: ListViewTableStateManagerImpl & SuggestionFilterableListViewStateManager;

  @Input()
  public selectionConfig: TableSelectionConfig = {
    useSelection: true,
    columnWidth: '40px',
    sticky: true,
    selectionMode: SelectionMode.MULTI
  };

  ngOnInit(): void {
    // this.stateManager?.updateItems().then()
  }

  public onColumnMoveChangeRequest($event: ColumnPositionChangeRequest) {
    this.stateManager.changeTableColumns($event.candidates)
  }

  public onColumnSizeChangeRequest($event: ColumnSizeChangeRequest) {
    this.stateManager.changeTableColumns($event.candidates)
  }

  public onSortChangeRequest($event: SortChangeRequest) {
    this.stateManager.changeTableSorting($event.candidates)
  }

  public onTableSelectionChangeRequest($event: SelectionChangeRequest) {
    this.stateManager.changeTableSelected($event.candidates)
    this.owner.onInputSuggestionEvent({
      type: InputSuggestionEventType.SELECTION_CHANGE,
      data: $event
    })
  }

  public onPageSizeChangeRequest($event: PageSizeChangeRequest) {
    this.stateManager.changeTablePage($event.candidate);
  }

  public onPageNumberChangeRequest($event: PageNumberChangeRequest) {
    this.stateManager.changeTablePage($event.candidate);
  }

  public onTableRowClickEvent($event: TableRowClickEvent) {
    this.owner.onInputSuggestionEvent({
      type: InputSuggestionEventType.ROW_CLICK,
      data: $event
    })
  }

  public onOwnerInputValueChangeEvent(args: SuggestionOwnerInputEvent) {
    this.stateManager.onSuggestionOwnerValueChangeEvent(args);
    // this.stateManager.updateItems().then();
  }
}
