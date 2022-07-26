import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlComponentEvent} from "../model/control-component.event";

@Component({
  selector: 'app-array-control',
  templateUrl: './array-control.component.html',
  styleUrls: ['./array-control.component.css']
})
export class ArrayControlComponent implements OnInit {
  @Input()
  isArrayElement: boolean = false;
  @Output()
  public onDeleteAllArrayElementsButtonClick: EventEmitter<ControlComponentEvent> = new EventEmitter<ControlComponentEvent>();

  constructor() { }

  ngOnInit(): void {
  }



}
