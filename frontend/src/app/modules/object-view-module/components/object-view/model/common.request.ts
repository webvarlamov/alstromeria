import {RequestType} from "./request.type";

export interface CommonRequest {
  metaInf: RequestMetaInf,
  subject: RequestSubjectState,
  owner: RequestOwnerState
  requestPurpose: RequestPurpose;
  requestType: RequestType
}

export class CommonRequestImpl implements CommonRequest {
  metaInf: RequestMetaInf;
  owner: RequestOwnerState;
  subject: RequestSubjectState;
  requestPurpose: RequestPurpose;
  requestType: RequestType

  constructor(args: CommonRequest) {
    this.metaInf = args.metaInf;
    this.owner = args.owner;
    this.requestPurpose = args.requestPurpose;
    this.requestType = args.requestType;
    this.subject = args.subject;
  }
}

export interface RequestMetaInf {
  key: any;
  path: string;
}

export class RequestMetaInfImpl implements RequestMetaInf {
  key: any;
  path: string;

  constructor(args: RequestMetaInf) {
    this.key = args.key;
    this.path = args.path;
  }
}

export interface RequestOwnerState {
  currentValue: any;
  valueType: string;
}

export interface RequestSubjectState {
  currentValue: any;
  nextValue: any;
  valueType: string;
}

export class RequestSubjectStateImpl implements RequestSubjectState {
  currentValue: any;
  nextValue: any;
  valueType: string;

  constructor(args: RequestSubjectState) {
    this.currentValue = args.currentValue;
    this.nextValue = args.nextValue;
    this.valueType = args.valueType;
  }
}

export class RequestOwnerStateImpl implements RequestOwnerState {
  currentValue: any;
  valueType: string;

  constructor(args: RequestOwnerState) {
    this.currentValue = args.currentValue;
    this.valueType = args.valueType;
  }
}

export enum RequestPurpose {
  CHANGE = 'CHANGE',
  DEFINE = 'DEFINE',
  DELETE = 'DELETE'
}


