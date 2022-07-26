import {
  AfterViewInit,
  ContentChild,
  Directive,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {SuggestionOwner} from "./suggestions.directive";
import {HasId} from "../../../../service/http/model/pageable";
import {BehaviorSubject} from "rxjs";
import {InputSuggestionComponent} from "../input-suggestion/input-suggestion.component";
import {RangeOperator} from "../../../../service/http/model/range-operator.enum";

export enum InputComponentType {
  BOOLEAN = 'boolean',
  BOOLEAN_LIST = 'boolean-list',
  DATETIME = 'date-time',
  DATETIME_LIST = 'date-time-list',
  ENTITY = 'entity',
  ENTITY_LIST = 'entity-list',
  ENUM = 'enum',
  ENUM_LIST = 'enum-list',
  NUMBER = 'number',
  NUMBER_LIST = 'number-list',
  STRING = 'string',
  STRING_LIST = 'string-list',
  PERIOD = 'period'
}


export interface InputComponentValueChangeRequest {
  attributeKey: string;
  value: InputComponentValue;
  config: InputComponentConfigImpl<any>;
}

export interface InputComponentData {
  attributeKey: string;
  config: InputComponentConfigImpl<any>;
  value: InputComponentValue;
}

export abstract class InputComponentValue {
  value: any = null;
  type: InputComponentType;

  abstract get(): any;

  constructor(value: any) {
    this.value = value;
  }
}

export interface InputComponentConfig {
  attributeKey: string;
  caption: string;
  componentType: InputComponentType;
}

export class InputComponentConfigImpl<T> implements InputComponentConfig {
  attributeKey: string;
  caption: string;
  componentType: InputComponentType;

  constructor(args: InputComponentConfig) {
    this.attributeKey = args?.attributeKey;
    this.caption = args?.caption;
    this.componentType = args?.componentType
  }
}

export interface SuggestionOwnerInputEvent {
  owner: InputComponent<any, any>;
  value: string;
}

@Directive({
  selector: 'app-input-component-directive'
})
export abstract class InputComponent<C extends InputComponentConfigImpl<any>, V extends InputComponentValue> extends SuggestionOwner implements OnInit, AfterViewInit {
  public inputValue$: BehaviorSubject<string> = new BehaviorSubject<any>('');
  @ContentChild(InputSuggestionComponent)
  public suggestionComponent: InputSuggestionComponent;
  @Input()
  public allowMasterInput: boolean = true;
  public inputPlaceholder: string = '';
  public inputDisabled: boolean = false;
  public inputSelectionValueInfo: string;

  @Input()
  public label: string = 'Label has not been overridden';

  @Input() config: C;
  @Input() value: V;

  @Output()
  public onInputComponentValueChangeRequest: EventEmitter<InputComponentValueChangeRequest> = new EventEmitter();

  ngOnInit(): void {
  }

  public onInputValueChange(value: string) {
    this.inputValue$.next(value);
    this.suggestionComponent.onOwnerInputValueChangeEvent({
      owner: this,
      value: value
    } as SuggestionOwnerInputEvent);
  }

  ngAfterViewInit(): void {
    if (this.suggestionComponent != null) {
      this.suggestionComponent.owner = this;
    }
  }
}


