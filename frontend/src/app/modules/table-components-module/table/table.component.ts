import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {HasId} from "../../../service/http/model/pageable";
import {ColumnSizeChangeRequest} from "./components/cell-resize/cell-resize.component";
import {TableUtilsService} from "./table-utils-service";
import {CollDragService} from "./components/coll-dragger/coll-drag.service";
import {TableValidatorService} from "./table-validator.service";
import {TableColumn} from "./models/dataModels/tableColumn";
import {TableRow} from "./models/dataModels/tableRow";
import {PageNumberChangeRequest} from "./models/changeRequest/pageNumberChangeRequest";
import {SelectionChangeRequest} from "./models/changeRequest/selectionChangeRequest";
import {TableSelectionConfig} from "./models/config/tableSelectionConfig";
import {SelectionMode} from "./models/config/selectionMode";
import {SortOrder, TableSort} from "./models/dataModels/tableSort";
import {ColumnPositionChangeRequest} from "./models/changeRequest/column-position-change.request";
import {SortChangeRequest} from "./models/changeRequest/sort-change-request";
import {PageSizeChangeRequest} from "./models/changeRequest/pageSizeChangeRequest";
import {Page} from "../../../service/http/model/page";
import {UUID} from "angular2-uuid";
import {TableRowClickEvent} from "./models/event/table-row-click-event";

export const DEFAULT_COLUMN_WIDTH = 200;
export const DEFAULT_PAGE_INPUT_SIZE = 5;
export const DEFAULT_MOCK_COLUMNS: Array<TableColumn> = [
  {id: "0", dataField: "0"},
  {id: "1", dataField: "1"},
  {id: "2", dataField: "2"},
  {id: "3", dataField: "3"},
  {id: "4", dataField: "4"},
  {id: "5", dataField: "5"},
  {id: "6", dataField: "6"},
  {id: "7", dataField: "7"},
  {id: "8", dataField: "8"},
  {id: "9", dataField: "9"},
]
export const DEFAULT_MOCK_SORTING: Array<TableSort> = []
export const DEFAULT_MOCK_ITEMS: Array<HasId> = [
  {id: "0"}, {id: "1"}, {id: "2"}, {id: "3"}, {id: "4"},
  {id: "5"}, {id: "6"}, {id: "7"}, {id: "8"}, {id: "9"},
  {id: "10"}, {id: "11"}, {id: "12"}, {id: "13"}, {id: "14"},
  {id: "15"}, {id: "16"}, {id: "17"}, {id: "18"}, {id: "19"}
]


export const DEFAULT_SELECTION_CONFIG: TableSelectionConfig = {
  sticky: true,
  useSelection: true,
  selectionMode: SelectionMode.MULTI,
  columnWidth: '35px',
}

export const DEFAULT_PAGING_CONFIG: TablePagingConfig = {
  showPagination: true,
  pageSizes: [10, 50, 100],
  showPageSizeSelector: true,
}

export interface TablePagingConfig {
  showPagination?: boolean;
  pageSizes?: Array<Number>,
  showPageSizeSelector?: boolean,
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TableUtilsService, CollDragService, TableValidatorService]
})
export class TableComponent<Entity extends HasId> implements OnInit, AfterViewInit, OnChanges {
  public uuid = UUID.UUID();
  public defaultColumnWidth: string = DEFAULT_COLUMN_WIDTH + 'px';

  @ViewChild('tableHeaderRow', {static: false}) tableHeaderRow: ElementRef;

  @Input() public id: string;
  @Input() public columns: Array<TableColumn> = [...DEFAULT_MOCK_COLUMNS];
  @Input() public items: Array<Entity | HasId> = [...DEFAULT_MOCK_ITEMS];
  @Input() public sorting: Array<TableSort> = [...DEFAULT_MOCK_SORTING];
  @Input() public selectionConfig: TableSelectionConfig = {...DEFAULT_SELECTION_CONFIG}
  @Input() public pagingConfig: TablePagingConfig = {...DEFAULT_PAGING_CONFIG};
  @Input() public showLoadingIndicator: boolean = false;

  @Input() public page: Page;
  @Input() public selectedEntities: Array<HasId> = [];

  @Output() public onPageNumberChangeRequest: EventEmitter<PageNumberChangeRequest> = new EventEmitter();
  @Output() public onSelectionChangeRequest: EventEmitter<SelectionChangeRequest> = new EventEmitter();
  @Output() public onColumnSizeChangeRequest: EventEmitter<ColumnSizeChangeRequest> = new EventEmitter();
  @Output() public onColumnPositionChangeRequest: EventEmitter<ColumnPositionChangeRequest> = new EventEmitter();
  @Output() public onPageSizeChangeRequest: EventEmitter<PageSizeChangeRequest> = new EventEmitter();
  @Output() public onSortChangeRequest: EventEmitter<SortChangeRequest> = new EventEmitter();
  @Output() public onTableComponentInit: EventEmitter<TableComponent<Entity>> = new EventEmitter();
  @Output() public onAfterTableComponentViewInit: EventEmitter<TableComponent<Entity>> = new EventEmitter();
  @Output() public onTableComponentDestroy: EventEmitter<void> = new EventEmitter();
  @Output() public onTableRowClickEvent: EventEmitter<TableRowClickEvent> = new EventEmitter();

  public trackByIdValue(index: number, item: TableRow) {
    return item.id;
  };

  constructor(
    private tableUtilsService: TableUtilsService,
    private collDragService: CollDragService,
    private tableValidatorService: TableValidatorService
  ) {
  }

  get getRows(): Array<TableRow> {
    const selectedEntitiesIds: Array<string> = this.selectedEntities.map(hasId => hasId.id);

    return this.items?.map((entity: HasId) => {
      console.assert(entity.id != null,
        "Table data item must implements HasId interface! Add field id:string to each item element.",
        entity
      );

      return {
        id: entity.id,
        data: entity,
        selected: selectedEntitiesIds.includes(entity.id)
      }
    });
  }

  get getSorting(): { [dataField: string]: SortOrder } {
    const sorting: { [dataField: string]: SortOrder } = {};
    this.sorting.forEach(si => {
      sorting[si.dataField] = si.order
    })
    return sorting;
  }

  get getColumns(): Array<TableColumn> {
    return this.columns ? this.columns : [];
  }

  get getPageNumber(): number {
    return this.page?.page + 1;
  }

  get getPageInputElementWidth(): number {
    return this.page != null
      ? this.page.pagesCount?.toString()?.length + 3
      : DEFAULT_PAGE_INPUT_SIZE
  }


  ngOnInit(): void {
    this.tableValidatorService.validate(this)
    this.onTableComponentInit.next(this);
  }

  public get isNetPageDisabled(): boolean {
    return this.page?.page + 1 === this.page?.pagesCount;
  }

  public get isPreviousPageDisabled(): boolean {
    return this?.page?.page === 0;
  }

  public ngAfterViewInit(): void {
    this.onAfterTableComponentViewInit.emit(this);

    this.collDragService
      .setTableHeaderRowElementRef(this.tableHeaderRow)
      .setTableColumns(this.columns)
  }

  public onTableRowClick($event: MouseEvent, row: TableRow): void {
    this.onTableRowClickEvent.emit({
      event: $event,
      tableRow: row
    })
  }

  public onRowSelectionCheckboxChange(row: TableRow, checked: boolean, $event: Event) {
    const selectionChangeRequest = this.tableUtilsService
      .calcSingleSelectionChangeRequest(row.data, checked, this.selectedEntities, this.selectionConfig.selectionMode);
    this.onSelectionChangeRequest.emit(selectionChangeRequest)
  }

  public onHeaderSelectionCheckboxChange(checkbox: HTMLInputElement) {
    const entities: Array<HasId> = this.items;
    const selectionChangeRequest = this.tableUtilsService
      .calcMultiSelectionChangeRequest(entities, checkbox.checked, this.selectedEntities, this.selectionConfig.selectionMode);
    this.onSelectionChangeRequest.emit(selectionChangeRequest)
  }

  public onColumnSizeChange($event: ColumnSizeChangeRequest) {
    const columnSizeChangeRequest = this.tableUtilsService
      .addCandidatesToColumnSizeChangeRequest($event, this.columns);
    this.onColumnSizeChangeRequest.emit(columnSizeChangeRequest)
  }

  public onColumnPositionChange($event: ColumnPositionChangeRequest) {
    const columnMoveChangeRequest = this.tableUtilsService
      .addCandidatesToColumnMoveChangeRequest($event, this.columns);
    this.onColumnPositionChangeRequest.emit(columnMoveChangeRequest)
  }

  public onSortChange($event: SortChangeRequest): any {
    const sortChangeRequest = this.tableUtilsService.calcSortingCandidates($event, this.sorting);
    this.onSortChangeRequest.emit(sortChangeRequest);
  }

  public previousPageNavButtonClick(): void {
    const nextPageNumber = this.page.page - 1;
    const pageCandidate = this.tableUtilsService.calcNumberChangePageCandidates(nextPageNumber, this.page)
    this.onPageNumberChangeRequest.emit({
      number: this.page.page - 1,
      candidate: pageCandidate
    })
  }

  public onUserPageNumberInput(pageNumber: string) {
    const candidate = parseInt(pageNumber, 10) - 1;
    if (candidate < this.page.pagesCount && candidate >= 0) {
      const nextPageNumber = parseInt(pageNumber, 10) - 1;
      const pageCandidate = this.tableUtilsService.calcNumberChangePageCandidates(nextPageNumber, this.page)
      this.onPageNumberChangeRequest.emit({
        number: nextPageNumber,
        candidate: pageCandidate
      })
    }
  }

  public nextPageNavButtonClick(): void {
    const nextPageNumber = this.page.page + 1
    const pageCandidate = this.tableUtilsService.calcNumberChangePageCandidates(nextPageNumber, this.page)
    this.onPageNumberChangeRequest.emit({
      number: nextPageNumber,
      candidate: pageCandidate
    })
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.setTableColumnsToCollDragService(changes)
  }

  private setTableColumnsToCollDragService(changes: SimpleChanges) {
    const columnsChanges = changes.columns;
    const currentValueTableColumns: Array<TableColumn> = columnsChanges?.currentValue;
    if (currentValueTableColumns != null) {
      this.collDragService.setTableColumns(currentValueTableColumns);
    }
  }

  get totalCheckboxIsIndeterminate(): boolean {
    const selectedOnPage = this.selectedEntities
      .filter(se => this.getPageEntities().find(pe => pe.id == se.id) != null);

    return this.selectedEntities.length != 0
      && selectedOnPage.length != 0
      && selectedOnPage.length != this.getPageEntities().length;
  }

  get totalCheckboxIsChecked(): boolean {
    return this.selectedEntities.length != 0
      && this.selectedEntities
        .filter(se => this.getPageEntities()
          .find(pe => pe.id == se.id) != null)
        .length > 0;
  }

  public getPageEntities(): Array<HasId> {
    return this.items;
  }

  public onPageSizeSelectorChange(pageSizeSelectorValue: string) {
    const nextPageSize = parseInt(pageSizeSelectorValue, 10);
    const pageCandidate = this.tableUtilsService.calcSizeChangePageCandidates(nextPageSize, this.page)
    this.onPageSizeChangeRequest.emit({
      size: parseInt(pageSizeSelectorValue, 10),
      candidate: pageCandidate
    })
  }
}
