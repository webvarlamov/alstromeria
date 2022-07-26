import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TableCellDynamicComponentImpl} from "../../models/common/table-cell-dynamic-component-impl";

@Component({
  selector: 'app-edit-table-row-item-cell-button',
  templateUrl: './edit-table-row-item-cell-button.component.html',
  styleUrls: ['./edit-table-row-item-cell-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTableRowItemCellButtonComponent extends TableCellDynamicComponentImpl implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
