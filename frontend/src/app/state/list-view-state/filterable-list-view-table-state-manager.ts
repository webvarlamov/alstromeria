import {ListViewTableState} from "./list-view-table-state";
import {ListViewTableStateManagerImpl} from "./list-view-table-state-manager-impl";
import {ListViewFiltersStateManagerImpl} from "../filter-state/list-view-filters-state-manager-impl";


export class FilterableListViewTableStateManager extends ListViewTableStateManagerImpl {
  public listViewFiltersStateManager: ListViewFiltersStateManagerImpl;

  constructor(
    args: {
      listViewTableState: ListViewTableState,
      listViewFiltersStateManager: ListViewFiltersStateManagerImpl;
    }
  ) {
    super(args.listViewTableState);
    this.listViewFiltersStateManager = args.listViewFiltersStateManager
  }
}

