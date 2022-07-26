import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {InputComponent} from "../input-component/input.component";
import {InputSuggestionEvent} from "../input-component/suggestions.directive";


@Component({
  selector: 'app-date-time-input',
  templateUrl: './date-time-input.component.html',
  styleUrls: ['./date-time-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateTimeInputComponent extends InputComponent<any, any> implements OnInit {
  onInputSuggestionEvent(event: InputSuggestionEvent): void {
  }
}
