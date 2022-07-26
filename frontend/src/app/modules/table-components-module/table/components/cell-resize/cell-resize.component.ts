import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {DEFAULT_COLUMN_WIDTH} from "../../table.component";
import {fromEvent, Observable, Subscription} from "rxjs";
import {map, switchMap, takeUntil, tap} from "rxjs/operators";
import {TableColumn} from "../../models/dataModels/tableColumn";

export class ColumnSizeChangeRequest {
  candidates?: TableColumn[]
  nextColumnSize: string;
  column: TableColumn;
}

@Component({
  selector: 'app-cell-resize-button',
  templateUrl: './cell-resize.component.html',
  styleUrls: ['./cell-resize.component.css']
})
export class CellResizeComponent implements OnInit, AfterViewInit, OnDestroy {
  private txCache: number;
  private dragX$: Observable<any>;
  private dragXSubscription: Subscription;
  private mouseUp$:   Observable<MouseEvent> = fromEvent(document, 'mouseup') as Observable<MouseEvent>;
  private mouseMove$: Observable<MouseEvent> = fromEvent(document, 'mousemove') as Observable<MouseEvent>;
  private mouseDown$: Observable<MouseEvent> = fromEvent(this.elementRef.nativeElement, 'mousedown') as Observable<MouseEvent>;

  @Input()
  tableBody: HTMLDivElement;
  @Input()
  column: TableColumn;

  @Output()
  onColumnSizeChangeRequest: EventEmitter<ColumnSizeChangeRequest> = new EventEmitter<ColumnSizeChangeRequest>();

  constructor(
    private elementRef: ElementRef,
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
        mouseDownEvent?.stopPropagation();
        return this.mouseMove$.pipe(
          map((moveEvent) => {
            return moveEvent.clientX - mouseDownEvent.clientX;
          }),
          tap(tx => {
            this.txCache = tx;
            this.elementRef.nativeElement.style.transform = `translateX(${tx}px)`;
          }),
          takeUntil(this.mouseUp$.pipe(
            tap(event => {
              this.publishColumnSizeChangeRequest();
              this.afterMouseUp(event)
            })
          ))
        )
      })
    )
  }

  public afterMouseDown(event$: MouseEvent): void {
    (this.elementRef.nativeElement as HTMLDivElement)
      .style.height = this.tableBody.clientHeight + 'px';
    (this.elementRef.nativeElement as HTMLDivElement)
      .style.opacity = '0.4';
    document.body.style.userSelect = 'none'
  }

  public afterMouseUp(event$: MouseEvent): void {
    (this.elementRef.nativeElement as HTMLDivElement)
      .style.transform = null;
    (this.elementRef.nativeElement as HTMLDivElement)
      .style.opacity = '0';
    document.body.style.userSelect = null;
    this.txCache = 0;
  }

  public publishColumnSizeChangeRequest() {
    const columnWidthString = this.column.width;
    const columnWidthNumber = columnWidthString != null
      ? parseInt(columnWidthString.replace('px', ''), 10)
      : DEFAULT_COLUMN_WIDTH;

    const nextColumnSize = columnWidthNumber + this.txCache;

    if (nextColumnSize > 5) {
      this.onColumnSizeChangeRequest.emit({
        column: {...this.column},
        nextColumnSize: nextColumnSize + 'px'
      })
    }
  }
}
