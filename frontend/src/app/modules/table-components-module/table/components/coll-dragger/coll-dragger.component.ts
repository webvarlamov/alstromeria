import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {fromEvent, Observable, Subscription} from "rxjs";
import {map, switchMap, takeUntil, tap} from "rxjs/operators";
import {CollDragService, IndexRelativePosition} from "./coll-drag.service";
import {TableColumn} from "../../models/dataModels/tableColumn";
import {ColumnPositionChangeRequest} from "../../models/changeRequest/column-position-change.request";

@Component({
  selector: 'app-coll-dragger',
  templateUrl: './coll-dragger.component.html',
  styleUrls: ['./coll-dragger.component.css']
})
export class CollDraggerComponent implements OnInit, AfterViewInit {
  private mouseMove$: Observable<MouseEvent> = fromEvent(document, 'mousemove') as Observable<MouseEvent>;
  private mouseUp$: Observable<MouseEvent> = fromEvent(document, 'mouseup') as Observable<MouseEvent>;
  private mouseDown$: Observable<MouseEvent> = fromEvent(this.elementRef.nativeElement, 'mousedown') as Observable<MouseEvent>;
  private dragX$: Observable<any>;
  private dragXSubscription: Subscription;
  private txCache: number;

  @Input()
  tableBody: HTMLDivElement;
  @Input()
  column: TableColumn;

  @Output()
  onColumnPositionChangeRequest: EventEmitter<ColumnPositionChangeRequest> = new EventEmitter<ColumnPositionChangeRequest>();

  constructor(
    private elementRef: ElementRef,
    private collDragService: CollDragService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dragX$ = this.initDragX();
    this.dragXSubscription = this.dragX$.subscribe();
  }

  ngOnDestroy(): void {
    this.dragXSubscription.unsubscribe();
  }

  private initDragX(): Observable<any> {
    return this.mouseDown$.pipe(
      tap(event => this.afterMouseDown(event)),
      switchMap((mouseDownEvent) => {
        // mouseDownEvent?.stopPropagation();
        return this.mouseMove$.pipe(
          map((moveEvent) => {
            return moveEvent.clientX - mouseDownEvent.clientX;
          }),
          tap(tx => {
            this.txCache = tx;
            this.setElementsCSS({
              transform: `translateX(${tx}px)`,
            });
          }),
          takeUntil(this.mouseUp$.pipe(
            tap(event => {
              const nextColumnPosition = this.collDragService.getNextColumnPosition(event, this.column);
              if (nextColumnPosition != null) {
                this.publishColumnIndexChangeRequest(nextColumnPosition);
              }
              this.afterMouseUp(event)
            })
          ))
        )
      })
    )
  }

  public afterMouseDown(event$: MouseEvent): void {
    document.body.style.userSelect = 'none';
    this.setElementsCSS({
      backgroundColor: 'var(--sapBackgroundColor)',
      zIndex: '100',
      opacity: 0.9,
      border: '1px solid',
      borderRadius: '3px',
      borderLeft: '1px solid var(--sapList_BorderColor)'
    })
  }

  public afterMouseUp(event$: MouseEvent): void {
    this.setElementsCSS({
      transform: `translateX(0px)`,
      backgroundColor: 'unset',
      zIndex: 'unset',
      opacity: 'unset',
      border: 'unset',
      borderRadius: 'unset',
      borderLeft: 'unset'
    });
    document.body.style.userSelect = null;
    this.txCache = 0;
  }

  public publishColumnIndexChangeRequest(nextPosition: IndexRelativePosition) {
    this.onColumnPositionChangeRequest.emit({
      nextPosition,
      column: this.column,
    })
  }

  private setElementsCSS(args: any & CSSStyleDeclaration) {
    const elements = document.querySelectorAll(`[column-id="${this.column.id}"]`);
    let element1 = elements[0];
      (element1 as HTMLDivElement).style.transform = args.transform;
      (element1 as HTMLDivElement).style.backgroundColor = args.backgroundColor;
      (element1 as HTMLDivElement).style.zIndex = args.zIndex;
      (element1 as HTMLDivElement).style.opacity = args.opacity;
      (element1 as HTMLDivElement).style.borderLeft = args.borderLeft;
    elements.forEach(element => {
      (element as HTMLDivElement).style.transform = args.transform;
      (element as HTMLDivElement).style.backgroundColor = args.backgroundColor;
      (element as HTMLDivElement).style.zIndex = args.zIndex;
      (element as HTMLDivElement).style.opacity = args.opacity
    })
  }
}
