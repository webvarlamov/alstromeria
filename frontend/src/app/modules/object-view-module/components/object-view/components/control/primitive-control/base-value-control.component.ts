import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-base-value-control',
  templateUrl: './base-value-control.component.html',
  styleUrls: ['./base-value-control.component.css']
})
export class BaseValueControlComponent implements OnInit {
  @Output()
  public onDefineValueButtonClick: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public onDeleteValueButtonClick: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  public allowDefineButton: boolean;
  @Input()
  public allowDeleteButton: boolean;

  constructor() { }

  ngOnInit(): void {
  }
}
