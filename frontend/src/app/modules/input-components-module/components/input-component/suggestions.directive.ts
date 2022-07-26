import {Directive, ElementRef, HostListener} from "@angular/core";
import {TableRowClickEvent} from "../../../table-components-module/table/models/event/table-row-click-event";

@Directive({
  selector: 'SuggestionOwner'
})
export abstract class SuggestionOwner {
  public showSuggestions: boolean = false;
  public showSelectedPopover: boolean = false;

  constructor(
    public elementRef: ElementRef
  ) {
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(target: HTMLElement): void {
    if (!this.elementRef.nativeElement.contains(target)) {
      this.showSuggestions = false;
      this.showSelectedPopover = false;
    }
  }

  public onInputClick(input: HTMLInputElement) {
    this.showSuggestions = true
  }

  public abstract onInputSuggestionEvent(event: InputSuggestionEvent): void;
}

export class InputSuggestionEvent {
  type: InputSuggestionEventType
  data: TableRowClickEvent | any
}

export enum InputSuggestionEventType {
  ROW_CLICK = 'ROW_CLICK',
  SELECTION_CHANGE = 'SELECTION_CHANGE',
}
