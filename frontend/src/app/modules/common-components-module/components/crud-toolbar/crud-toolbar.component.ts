import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-crud-toolbar',
  templateUrl: './crud-toolbar.component.html',
  styleUrls: ['./crud-toolbar.component.css']
})
export class CrudToolbarComponent implements OnInit {
  @Output() onCreateButtonClick: EventEmitter<void> = new EventEmitter()
  @Output() onDeleteButtonClick: EventEmitter<void> = new EventEmitter()
  @Output() onEditButtonClick: EventEmitter<void> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

}
