import { Component, OnInit } from '@angular/core';
import { TableCellDynamicComponentImpl } from "../../models/common/table-cell-dynamic-component-impl";

export class EditTableRowItemCellInputComponentEvent {
  previousValue: string;
  currentValue: string;
  $event: InputEvent
}

@Component({
  selector: 'app-edit-table-row-item-cell-input',
  templateUrl: './edit-table-row-item-cell-input.component.html',
  styleUrls: ['./edit-table-row-item-cell-input.component.css']
})
export class EditTableRowItemCellInputComponent extends TableCellDynamicComponentImpl implements OnInit {

  constructor() {
    super()
  }

  ngOnInit(): void {
  }

  onInputValueChange(inputElement: HTMLInputElement, $event: any) {
    this.emitEvent({
      previousValue: inputElement.attributes.getNamedItem('previous-value').value,
      currentValue: inputElement.value,
      $event
    })
  }
}
