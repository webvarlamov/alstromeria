import {ObjectStateChangeRequest} from "../../../../object-view-module/components/object-view/model/object-state-change.request";
import {CommonRequestImpl, RequestPurpose} from "../../../../object-view-module/components/object-view/model/common.request";
import {RequestType} from "../../../../object-view-module/components/object-view/model/request.type";
import {TypeGraph} from "../../../../object-view-module/components/object-view/model/type.graph";

export abstract class AbstractObjectViewEventsManager {
  public abstract typeGraph: TypeGraph & any;

  public onObjectStateChangeRequestEvent($event: ObjectStateChangeRequest) {
    const payload:CommonRequestImpl = $event.payload;

    if (payload.requestPurpose === RequestPurpose.DEFINE) {
      this.onObjectStateDefineRequest($event)
    } else if (payload.requestPurpose === RequestPurpose.DELETE) {
      this.onObjectStateDeleteRequest($event)
    } else if (payload.requestPurpose === RequestPurpose.CHANGE) {
      this.onObjectStateChangeRequest($event)
    }
  }

  public onObjectStateDefineRequest($event: ObjectStateChangeRequest): void {
    let payload = $event.payload;
    let typeFinderService = $event.typeFinderService;

    if (typeFinderService.isArray(payload.subject.valueType)) {
      payload.owner.currentValue[payload.metaInf.key] = [];
    } else if (typeFinderService.isObject(payload.subject.valueType, this.typeGraph)) {
      payload.owner.currentValue[payload.metaInf.key] = {};
    } else if(typeFinderService.isString(payload.subject.valueType)) {
      payload.owner.currentValue[payload.metaInf.key] = '';
    } else if(typeFinderService.isNumber(payload.subject.valueType)) {
      payload.owner.currentValue[payload.metaInf.key] = 100;
    }
  }

  public onObjectStateDeleteRequest($event: ObjectStateChangeRequest): void {
    let payload = $event.payload;
    let typeFinderService = $event.typeFinderService;

    if (typeFinderService.isObject(payload.owner.valueType, this.typeGraph)) {
      delete payload.owner.currentValue[payload.metaInf.key];
    }

    if (typeFinderService.isArray(payload.owner.valueType)) {
      (payload.owner.currentValue as Array<any>)
        .splice(payload.metaInf.key, 1)
    }
  }

  public onObjectStateChangeRequest($event: ObjectStateChangeRequest): void {
    let payload = $event.payload;
    let typeFinderService = $event.typeFinderService;

    if (payload.requestType == RequestType.DELETE_ALL_ARRAY_ITEMS) {
      if (payload.owner.currentValue[payload.metaInf.key] != null) {
        payload.owner.currentValue[payload.metaInf.key] = [];
      }
    }

    if (payload.requestType == RequestType.ADD_ARRAY_ITEM) {
      if (typeFinderService.isArray(payload.subject.valueType)) {
        (payload.owner.currentValue as Array<any>).push([]);
      } else if (typeFinderService.isObject(payload.subject.valueType, this.typeGraph)) {
        (payload.owner.currentValue as Array<any>).push({});
      } else if (typeFinderService.isEnum(payload.subject.valueType)) {
        (payload.owner.currentValue as Array<any>).push(undefined);
      } else {
        (payload.owner.currentValue as Array<any>).push(undefined);
      }
    }

    if (payload.requestType == RequestType.CHANGE_OBJECT_PROPERTY_VALUE) {
      payload.owner.currentValue[payload.metaInf.key] = payload.subject.nextValue;
    }

    if (payload.requestType == RequestType.CHANGE_ARRAY_ITEM_VALUE) {
      payload.owner.currentValue[payload.metaInf.key] = payload.subject.nextValue;
    }
  }
}
