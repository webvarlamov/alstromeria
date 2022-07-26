import {Directive, Injector, OnInit} from "@angular/core";
import {
  ColumnPositionChangeRequest
} from "../../../../modules/table-components-module/table/models/changeRequest/column-position-change.request";
import {
  ColumnSizeChangeRequest
} from "../../../../modules/table-components-module/table/components/cell-resize/cell-resize.component";
import {SortChangeRequest} from "../../../../modules/table-components-module/table/models/changeRequest/sort-change-request";
import {
  SelectionChangeRequest
} from "../../../../modules/table-components-module/table/models/changeRequest/selectionChangeRequest";
import {PageSizeChangeRequest} from "../../../../modules/table-components-module/table/models/changeRequest/pageSizeChangeRequest";
import {
  PageNumberChangeRequest
} from "../../../../modules/table-components-module/table/models/changeRequest/pageNumberChangeRequest";
import {ListViewTableState} from "../../../../state/list-view-state/list-view-table-state";
import {ListViewTableStateManagerImpl} from "../../../../state/list-view-state/list-view-table-state-manager-impl";
import {PagingAndSortingRemoteRepositoryListViewStateManagerImpl} from "../../../../provider/paging-and-sorting-remote-repository-list-view-state-manager-impl";
import {HasId} from "../../../../service/http/model/pageable";
import {$e} from "@angular/compiler/src/chars";

@Directive({
  selector: "app-list-view-component",
})
export class ListViewComponent<T extends HasId> implements OnInit {
  public listViewTableState: ListViewTableState = new ListViewTableState({
    tableItemsList: [],
    tablePage: {
      size: 10,
      pagesCount: 0,
      itemsCount: 0,
      page: 0,
    },
    tableColumns: []
  });

  // public listViewTableStateManager: ListViewTableStateManagerImpl = new ListViewTableStateManagerImpl(this.listViewTableState);
  public listViewStateManager: PagingAndSortingRemoteRepositoryListViewStateManagerImpl<T>;

  constructor(
    public injector: Injector
  ) {}

  ngOnInit(): void {}

  public onColumnMoveChangeRequest($event: ColumnPositionChangeRequest) {
    this.listViewStateManager.onColumnMoveChangeRequest($event)
  }

  public onColumnSizeChangeRequest($event: ColumnSizeChangeRequest) {
    this.listViewStateManager.onColumnSizeChangeRequest($event)
    // this.listViewTableState.nextTableColumnsList($event.candidates)
  }

  public onSortChangeRequest($event: SortChangeRequest) {
    this.listViewStateManager.onSortChangeRequest($event)
    // this.listViewTableStateManager.changeTableSorting($event.candidates)
  }

  public onTableSelectionChangeRequest($event: SelectionChangeRequest) {
    this.listViewStateManager.onTableSelectionChangeRequest($event);
    // this.listViewTableState.nextTableSelectedList($event.candidates)
  }

  public onPageSizeChangeRequest($event: PageSizeChangeRequest) {
    this.listViewStateManager.onPageSizeChangeRequest($event)
    // this.listViewTableStateManager.changeTablePage($event.candidate);
  }

  public onPageNumberChangeRequest($event: PageNumberChangeRequest) {
    this.listViewStateManager.onPageNumberChangeRequest($event);
    // this.listViewTableStateManager.changeTablePage($event.candidate);
  }

  public onDeleteItemsRequest() {
    this.listViewStateManager.onDeleteItemsRequest();
    // this.listViewTableStateManager.deleteSelectedTableItems();
  }
}
