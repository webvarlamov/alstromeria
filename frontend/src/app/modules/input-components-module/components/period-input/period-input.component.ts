import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {InputComponent, InputComponentConfigImpl, InputComponentValue} from "../input-component/input.component";
import {InputSuggestionEvent} from "../input-component/suggestions.directive";
import {TableRowClickEvent} from "../../../table-components-module/table/models/event/table-row-click-event";

@Component({
  selector: 'app-period-input',
  templateUrl: './period-input.component.html',
  styleUrls: ['./period-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeriodInputComponent extends InputComponent<InputComponentConfigImpl<any>, InputComponentValue> implements OnInit {
  onInputSuggestionEvent(event: InputSuggestionEvent): void {
  }
}
