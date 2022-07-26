import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {InputComponent} from "../input-component/input.component";
import {InputSuggestionEvent} from "../input-component/suggestions.directive";


@Component({
  selector: 'app-enum-input',
  templateUrl: "../list-view-input-component/list-view-input-component.directive.html",
  styleUrls: ['./enum-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnumInputComponent extends InputComponent<any, any> implements OnInit {
  public allowMasterInput = false;
  public inputPlaceholder = 'Выберите значение';

  public onInputSuggestionEvent(event: InputSuggestionEvent): void {
  }
}
