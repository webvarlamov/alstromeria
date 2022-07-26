import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, fromEvent, merge, of} from "rxjs";
import {delay, switchMap, take, tap} from "rxjs/operators";

@Component({
  selector: 'app-context-menu-control',
  templateUrl: './context-menu-control.component.html',
  styleUrls: ['./context-menu-control.component.css']
})
export class ContextMenuControlComponent implements OnInit {
  public showControlsContextMenu$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor() { }

  ngOnInit(): void {
  }

  public onUserContextMenuCall($event: MouseEvent) {
    of([]).pipe(
      delay(10),
      tap(() => this.showControlsContextMenu$.next(true)),
      switchMap(() => merge(
        fromEvent(document, 'contextmenu').pipe(take(1)),
        fromEvent(document, 'click').pipe(take(1)),
      )),
      tap(() => this.showControlsContextMenu$.next(false)),
    ).toPromise().then();
    return false;
  }

}
