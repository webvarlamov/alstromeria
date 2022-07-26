import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {PropertyValueView} from "../property-view/property-value-view.directive";
import {
  CommonRequestImpl,
  RequestMetaInfImpl,
  RequestOwnerStateImpl, RequestPurpose,
  RequestSubjectStateImpl
} from "../../model/common.request";
import {RequestType} from "../../model/request.type";

@Component({
  selector: 'app-number-property-view',
  templateUrl: './number-property-view.component.html',
  styleUrls: ['./number-property-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberPropertyViewComponent extends PropertyValueView implements OnInit {
  @Input()
  public value: any;
  @Input()
  public key: any;

  public onInputValueChange(value: string): void {
    this.root.onObjectStateChangeRequest.emit({
      typeFinderService: this.typeFinderService,
      payload: new CommonRequestImpl({
        metaInf: new RequestMetaInfImpl({
          path: this.path as string,
          key: this.key,
        }),
        subject: new RequestSubjectStateImpl({
          currentValue: this.value,
          nextValue: value == '' ? undefined : value,
          valueType: this.type
        }),
        owner: new RequestOwnerStateImpl({
          valueType: this.ownerType,
          currentValue: this.owner,
        }),
        requestPurpose: RequestPurpose.CHANGE,
        requestType: this.isArrayItem ? RequestType.CHANGE_ARRAY_ITEM_VALUE : RequestType.CHANGE_OBJECT_PROPERTY_VALUE,
      })
    })
  }

  public onDefineValueButtonClick($event: any): void {

  }

  public onDeleteValueButtonClick($event: any): void {

  }
}
