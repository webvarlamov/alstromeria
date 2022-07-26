import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {InputComponent} from "../input-component/input.component";
import {InputSuggestionEvent} from "../input-component/suggestions.directive";

@Component({
  selector: 'app-boolean-input',
  templateUrl: "../list-view-input-component/list-view-input-component.directive.html",
  styleUrls: ['./boolean-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooleanInputComponent extends InputComponent<any, any> implements OnInit {
  public allowMasterInput = false;
  public inputDisabled = false;
  public inputPlaceholder = 'Выберите значение'

  onInputSuggestionEvent(event: InputSuggestionEvent): void {

  }
}
