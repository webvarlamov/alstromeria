import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-save-or-cancel-toolbar',
  templateUrl: './save-or-cancel-toolbar.component.html',
  styleUrls: ['./save-or-cancel-toolbar.component.css']
})
export class SaveOrCancelToolbarComponent implements OnInit {
  @Output() saveButtonClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancelButtonClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
