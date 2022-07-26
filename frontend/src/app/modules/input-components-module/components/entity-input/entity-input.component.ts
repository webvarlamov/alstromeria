import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {InputComponent} from "../input-component/input.component";
import {InputSuggestionEvent} from "../input-component/suggestions.directive";

@Component({
  selector: 'app-entity-input',
  templateUrl: "../list-view-input-component/list-view-input-component.directive.html",
  styleUrls: ['./entity-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityInputComponent extends InputComponent<any, any> implements OnInit {
  inputPlaceholder: string = 'Введите значение поиска'

  onInputSuggestionEvent($event: InputSuggestionEvent): void {
  }
}
