import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {TableCellDynamicComponentImpl} from "../../models/common/table-cell-dynamic-component-impl";

@Component({
  selector: 'app-null-value-cell-display',
  templateUrl: './null-value-cell-display.component.html',
  styleUrls: ['./null-value-cell-display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NullValueCellDisplayComponent extends TableCellDynamicComponentImpl implements OnInit, OnDestroy {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
