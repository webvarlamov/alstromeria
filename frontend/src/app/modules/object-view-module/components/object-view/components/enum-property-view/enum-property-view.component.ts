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
  selector: 'app-enum-property-view',
  templateUrl: './enum-property-view.component.html',
  styleUrls: ['./enum-property-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnumPropertyViewComponent extends PropertyValueView implements OnInit {
  @Input()
  public value: any;
  @Input()
  public key: any;

  public getEnumMembers(): Array<{label: string, value: string}> {
    let enumMemberType = this.typeFinderService.getEnumMemberType(this.type);
    let typeGraphElement = this.typeGraph[enumMemberType];
    if (typeGraphElement != null) {
      const pairArray = Object.entries(typeGraphElement).map(entry => {
        return {
          label: this.enumMembersLocalisation[enumMemberType][entry[0]],
          value: entry[0]
        }
      });
      return pairArray;
    } else {
      return []
    }
  }

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
          nextValue: value,
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

  public onDeleteValueButtonClick($event: any) {
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
