import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TableColumn} from "../../models/dataModels/tableColumn";
import {SortOrder} from "../../models/dataModels/tableSort";
import {ColumnPositionChangeRequest} from "../../models/changeRequest/column-position-change.request";
import {SortChangeRequest} from "../../models/changeRequest/sort-change-request";

@Component({
  selector: 'app-column-controls',
  templateUrl: './column-controls.component.html',
  styleUrls: ['./column-controls.component.css']
})
export class ColumnControlsComponent implements OnInit {
  @Output()
  public onColumnPositionChangeRequest: EventEmitter<ColumnPositionChangeRequest> = new EventEmitter();
  @Output()
  public onSortChangeRequest: EventEmitter<SortChangeRequest> = new EventEmitter();
  @Input()
  public column: TableColumn;
  @Input()
  public sortOrder: SortOrder

  constructor() { }

  ngOnInit(): void {
  }

  public onSortClick(buttonSortOrder: SortOrder) {
    this.onSortChangeRequest.emit({
      enabled: buttonSortOrder !== this.sortOrder,
      dataField: this.column.dataField,
      sortOrder: buttonSortOrder,
    })
  }

  public onColumnPositionChange($event: ColumnPositionChangeRequest) {
    this.onColumnPositionChangeRequest.emit($event)
  }

  public getSortOrderByString(order: string): SortOrder {
    return order === 'asc' ? SortOrder.ASC : SortOrder.DESC
  }
}
