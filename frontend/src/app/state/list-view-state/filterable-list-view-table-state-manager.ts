import {ListViewTableState} from "./list-view-table-state";
import {ListViewTableStateManagerImpl} from "./list-view-table-state-manager-impl";
import {ListViewFiltersStateManager, ListViewFiltersStateManagerImpl} from "../filter-state/list-view-filters-state-manager-impl";


export class FilterableListViewTableStateManager extends ListViewTableStateManagerImpl {
  public listViewFiltersStateManager: ListViewFiltersStateManager;

  constructor(
    args: {
      listViewTableState: ListViewTableState,
      listViewFiltersStateManager: ListViewFiltersStateManager;
    }
  ) {
    super(args.listViewTableState);
    this.listViewFiltersStateManager = args.listViewFiltersStateManager
  }
}

