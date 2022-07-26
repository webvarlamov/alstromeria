import {FilterStateChangeRequest} from "../common/filter-state-change-request";
import {ListViewFiltersStateManager} from "../../../../../state/filter-state/list-view-filters-state-manager-impl";
import {CommonRequestImpl, RequestPurpose} from "../../../../object-view-module/components/object-view/model/common.request";
import {RequestType} from "../../../../object-view-module/components/object-view/model/request.type";
import {FilterComponentValue} from "../../../../filter-components-module/models/filter-component-value";
import * as objectPath from "object-path";
import {StringFilterComponentValueImpl} from "../../../../filter-components-module/models/filter-component-value-basic-impl";
import {FilterValuesByAttributeKey} from "../../../../../view/view/component/list-view/filter-values-by-attribute.key";


export class ListViewFilterDetailEventManagerImpl {
  public listViewFiltersStateManager: ListViewFiltersStateManager;

  constructor(listViewFiltersStateManager: ListViewFiltersStateManager) {
    this.listViewFiltersStateManager = listViewFiltersStateManager;
  }

  public onFilterDetailsEvent(event: FilterStateChangeRequest) {
    console.group("onFilterDetailsEvent")
    console.info(event)

    let listViewFilterState = this.listViewFiltersStateManager.getListViewFilterState();
    let filterValuesByAttributeKey = listViewFilterState.filterValuesByAttributeKey$.getValue();
    let changeableFilterState: FilterComponentValue<any, any, any> = {...filterValuesByAttributeKey[event.attributeKey]};

    const payload:CommonRequestImpl = event.payload;
    let eventPath = payload.metaInf.path;
    let adaptedObjectPath = this.getAdaptedObjectPath(eventPath);

    if (payload.requestPurpose === RequestPurpose.DEFINE) {
      this.onObjectStateDefineRequest(event, adaptedObjectPath, changeableFilterState)
    } else if (payload.requestPurpose === RequestPurpose.DELETE) {
      this.onObjectStateDeleteRequest(event, adaptedObjectPath, changeableFilterState)
    } else if (payload.requestPurpose === RequestPurpose.CHANGE) {
      this.onObjectStateChangeRequest(event, adaptedObjectPath, changeableFilterState)
    }

    let byAttributeKey: FilterValuesByAttributeKey<any> = {};
    byAttributeKey[event.attributeKey] = changeableFilterState;
    let assign = Object.assign(filterValuesByAttributeKey, changeableFilterState);

    listViewFilterState.filterValuesByAttributeKey$.next(assign);

    console.groupEnd()
  }

  public onObjectStateDefineRequest(event: FilterStateChangeRequest, adaptedObjectPath: string, value: FilterComponentValue<any, any, any>): void {
    console.info("onObjectStateDefineRequest")

    let payload = event.payload;
    let typeFinderService = event.typeFinderService;

    if (typeFinderService.isArray(payload.subject.valueType)) {
      // payload.owner.currentValue[payload.metaInf.key] = [];
    } else if (typeFinderService.isObject(payload.subject.valueType, event.typeGraph)) {
      // payload.owner.currentValue[payload.metaInf.key] = {};
    } else if(typeFinderService.isString(payload.subject.valueType)) {
      // payload.owner.currentValue[payload.metaInf.key] = '';
    } else if(typeFinderService.isNumber(payload.subject.valueType)) {
      // payload.owner.currentValue[payload.metaInf.key] = 100;
    }
  }

  public onObjectStateDeleteRequest(event: FilterStateChangeRequest, changeRequestPath: string, changeableObject: FilterComponentValue<any, any, any>): void {
    console.info("onObjectStateDeleteRequest")

    let payload = event.payload;
    let typeFinderService = event.typeFinderService;

    if (typeFinderService.isObject(payload.owner.valueType, event.typeGraph)) {
      // TODO: Удаление свойства
      objectPath.del(changeableObject, changeRequestPath);
      console.log([changeableObject, changeRequestPath])
      delete payload.owner.currentValue[payload.metaInf.key];
    }

    if (typeFinderService.isArray(payload.owner.valueType)) {
      objectPath.del(changeableObject, changeRequestPath);
    }
  }

  public onObjectStateChangeRequest(event: FilterStateChangeRequest, changeRequestPath: string, changeableObject: FilterComponentValue<any, any, any>): void {
    console.info(["onObjectStateChangeRequest", event, changeRequestPath, changeableObject])

    let payload = event.payload;
    let typeFinderService = event.typeFinderService;

    if (payload.requestType == RequestType.DELETE_ALL_ARRAY_ITEMS) {
      // if (payload.owner.currentValue[payload.metaInf.key] != null) {
      //   payload.owner.currentValue[payload.metaInf.key] = [];
      // }
    }

    if (payload.requestType == RequestType.ADD_ARRAY_ITEM) {
      objectPath.push(changeableObject, changeRequestPath, new StringFilterComponentValueImpl());
      // let newObject = objectPath.set(changeableObject, changeRequestPath, new StringFilterComponentValueImpl());

      // if (typeFinderService.isArray(payload.subject.valueType)) {
      //   // (payload.owner.currentValue as Array<any>).push([]);
      // } else if (typeFinderService.isObject(payload.subject.valueType, event.typeGraph)) {
      //   debugger
      //
      //   // (payload.owner.currentValue as Array<any>).push({});
      // } else if (typeFinderService.isEnum(payload.subject.valueType)) {
      //   // (payload.owner.currentValue as Array<any>).push(undefined);
      // } else {
      //   // (payload.owner.currentValue as Array<any>).push(undefined);
      // }
    }

    if (payload.requestType == RequestType.CHANGE_OBJECT_PROPERTY_VALUE) {
      // payload.owner.currentValue[payload.metaInf.key] = payload.subject.nextValue;
      objectPath.set(changeableObject, changeRequestPath, payload.subject.nextValue)
    }

    if (payload.requestType == RequestType.CHANGE_ARRAY_ITEM_VALUE) {
      // payload.owner.currentValue[payload.metaInf.key] = payload.subject.nextValue;
    }
  }



  public getAdaptedObjectPath(str: string): string {
    return str.split("[")
      .join("")
      .split("]")
      .join("")
  }
}
