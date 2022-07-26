import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {PropertyValueView} from "../property-view/property-value-view.directive";

@Component({
  selector: 'app-any-property-view',
  templateUrl: './any-property-view.component.html',
  styleUrls: ['./any-property-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnyPropertyViewComponent extends PropertyValueView implements OnInit {
  @Input()
  public value: any;
  @Input()
  public key: any;

  public onInputValueChange(value: string): void {

  }

  public onDefineValueButtonClick(): void {

  }
}
