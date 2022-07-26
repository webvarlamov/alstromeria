import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PropertyValueView} from "./components/property-view/property-value-view.directive";
import 'reflect-metadata';
import {TypeFinderService} from "./service/type-finder-service";
import {ObjectStateChangeRequest} from "./model/object-state-change.request";

@Component({
  selector: 'app-object-view',
  templateUrl: './object-view.component.html',
  styleUrls: ['./object-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectViewComponent extends PropertyValueView implements OnInit {
  @Input()
  public objectState: {} = {};

  @Output()
  public onObjectStateChangeRequest: EventEmitter<ObjectStateChangeRequest> = new EventEmitter<ObjectStateChangeRequest>();

  @Input()
  public typeFinderService: TypeFinderService = new TypeFinderService();

  constructor() {
    super();
  }

  public getValue(objectState: any, key: string): any | Array<any> {
    return objectState[key];
  }
}
