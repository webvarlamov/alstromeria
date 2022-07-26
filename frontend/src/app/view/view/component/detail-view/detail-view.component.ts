import {Directive, ElementRef, EventEmitter, Inject, Injectable, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject} from "rxjs";

export class DetailViewConfig {
}

export class DetailViewState {
}

@Injectable()
export class DetailViewStateManager {
  public state?: DetailViewState = {}

  constructor(
  ) {
  }
}

@Directive()
export class DetailViewComponent implements OnInit {
  constructor(
  ) {
  }

  ngOnInit(): void {
  }

}
