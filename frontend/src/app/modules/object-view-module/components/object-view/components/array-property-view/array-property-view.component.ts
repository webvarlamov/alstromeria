import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {PropertyValueView} from "../property-view/property-value-view.directive";
import {
  CommonRequestImpl,
  RequestMetaInfImpl,
  RequestOwnerStateImpl,
  RequestPurpose,
  RequestSubjectStateImpl
} from "../../model/common.request";
import {ControlComponentEvent} from "../control/model/control-component.event";
import {RequestType} from "../../model/request.type";

@Component({
  selector: 'app-array-property-view',
  templateUrl: './array-property-view.component.html',
  styleUrls: ['./array-property-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArrayPropertyViewComponent extends PropertyValueView implements OnInit {
  @Input()
  public value: any | Array<unknown>;
  @Input()
  public key: any;

  public onAddArrayElementButtonClick(): void {
    this.root.onObjectStateChangeRequest.emit({
      typeFinderService: this.typeFinderService,
      payload: new CommonRequestImpl({
        metaInf: new RequestMetaInfImpl({
          path: this.path as string,
          key: this.key,
        }),
        subject: new RequestSubjectStateImpl({
          currentValue: undefined,
          nextValue: undefined,
          valueType: this.typeFinderService.getArrayElementType(this.type)
        }),
        owner: new RequestOwnerStateImpl({
          valueType: this.type,
          currentValue: this.value,
        }),
        requestPurpose: RequestPurpose.CHANGE,
        requestType: RequestType.ADD_ARRAY_ITEM,
      })
    })
  }

  public onDeleteAllArrayElementsButtonClick($event: ControlComponentEvent): void {
    this.root.onObjectStateChangeRequest.emit({
      typeFinderService: this.typeFinderService,
      payload: new CommonRequestImpl({
        metaInf: new RequestMetaInfImpl({
          path: this.path as string,
          key: this.key,
        }),
        subject: {
          currentValue: this.value,
          nextValue: undefined,
          valueType: this.type
        },
        owner: {
          valueType: this.ownerType,
          currentValue: this.owner,
        },
        requestPurpose: RequestPurpose.CHANGE,
        requestType: RequestType.DELETE_ALL_ARRAY_ITEMS
      })
    })
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
          valueType: this.ownerType,
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

