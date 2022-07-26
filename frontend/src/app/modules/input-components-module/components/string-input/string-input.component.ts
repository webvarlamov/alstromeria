import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {InputComponent,} from "../input-component/input.component";
import {InputSuggestionEvent, InputSuggestionEventType} from "../input-component/suggestions.directive";
import {RangeOperator} from "../../../../service/http/model/range-operator.enum";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-string-input',
  templateUrl: "../list-view-input-component/list-view-input-component.directive.html",
  styleUrls: ['./string-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StringInputComponent extends InputComponent<any, any> implements OnInit {
  public inputPlaceholder: string = 'Введите значение';

  public rangeOperators: Array<{ icon: string, operator: RangeOperator }> = [
    {icon: 'EQ', operator: RangeOperator.EQ},
    {icon: 'NE', operator: RangeOperator.NE},
    {icon: 'LK', operator: RangeOperator.LIKE},
    {icon: 'SW', operator: RangeOperator.STARTWITH},
    {icon: 'EW', operator: RangeOperator.ENDWITH},
  ];

  public selectedRangeOperator: BehaviorSubject<RangeOperator>
    = new BehaviorSubject<RangeOperator>(RangeOperator.EQ);

  onInputSuggestionEvent(event: InputSuggestionEvent): void {
    if (event.type === InputSuggestionEventType.ROW_CLICK) {

    }
  }
}
