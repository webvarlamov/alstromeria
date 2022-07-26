import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {PropertyValueView} from "../property-view/property-value-view.directive";
import {KeyValue} from "@angular/common";
import {ControlComponentEvent} from "../control/model/control-component.event";
import {
  CommonRequestImpl,
  RequestMetaInfImpl,
  RequestOwnerStateImpl,
  RequestPurpose,
  RequestSubjectStateImpl
} from "../../model/common.request";
import {RequestType} from "../../model/request.type";

@Component({
  selector: 'app-object-property-view',
  templateUrl: './object-property-view.component.html',
  styleUrls: ['./object-property-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectPropertyViewComponent extends PropertyValueView implements OnInit {
  @Input()
  public value: any | KeyValue<unknown, unknown>;
  @Input()
  public key: any;

  public getValue(value: any, key: string): any | Array<any> {
    return value[key];
  }

  public onRemoveObjectButtonClick(): void {

  }

  public onMoveUpObjectButtonClick(): void {

  }

  public onMoveDownObjectButtonClick(): void {

  }

  public onDefineValueButtonClick($event: ControlComponentEvent): void {
    this.root.onObjectStateChangeRequest.emit({
      typeFinderService: this.typeFinderService,
      payload: new CommonRequestImpl({
        metaInf: new RequestMetaInfImpl({
          path: this.path as string,
          key: this.key,
        }),
        subject: new RequestSubjectStateImpl({
          currentValue: this.value,
          nextValue: undefined,
          valueType: this.type
        }),
        owner: new RequestOwnerStateImpl({
          valueType: this.typeFinderService.getArrayElementType(this.type),
          currentValue: this.owner,
        }),
        requestPurpose: RequestPurpose.DEFINE,
        requestType: this.isArrayItem ? RequestType.DEFINE_ARRAY_ITEM_VALUE : RequestType.DEFINE_OBJECT_PROPERTY_VALUE,
      })
    })
  }

  public onDeleteValueButtonClick($event: any): void  {
    this.root.onObjectStateChangeRequest.emit({
      typeFinderService: this.typeFinderService,
      payload: new CommonRequestImpl({
        metaInf: new RequestMetaInfImpl({
          path: this.path as string,
          key: this.key,
        }),
        subject: new RequestSubjectStateImpl({
          currentValue: this.value,
          nextValue: undefined,
          valueType: this.type
        }),
        owner: new RequestOwnerStateImpl({
          valueType: this.ownerType,
          currentValue: this.owner,
        }),
        requestPurpose: RequestPurpose.DELETE,
        requestType: this.isArrayItem ? RequestType.DELETE_ARRAY_ITEM_VALUE : RequestType.DELETE_OBJECT_PROPERTY_VALUE,
      })
    })
  }
}
