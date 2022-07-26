import {Directive, Injectable, OnInit} from '@angular/core';

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
