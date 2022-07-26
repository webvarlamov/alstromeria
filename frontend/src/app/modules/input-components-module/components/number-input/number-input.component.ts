import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {InputComponent} from "../input-component/input.component";
import {InputSuggestionEvent, InputSuggestionEventType} from "../input-component/suggestions.directive";

@Component({
  selector: 'app-number-input',
  templateUrl: "../list-view-input-component/list-view-input-component.directive.html",
  styleUrls: ['./number-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberInputComponent extends InputComponent<any, any> implements OnInit {
  public inputPlaceholder: string = 'Введите значение';

  onInputSuggestionEvent(event: InputSuggestionEvent): void {
    if (event.type === InputSuggestionEventType.ROW_CLICK) {

    }
  }
}
