import {ListViewTableStateManagerImpl} from "../../../../state/list-view-state/list-view-table-state-manager-impl";
import {ListViewTableState} from "../../../../state/list-view-state/list-view-table-state";
import {of} from "rxjs";

export class BooleanInputListViewTableStateManager extends ListViewTableStateManagerImpl {constructor() {
    super(new ListViewTableState(
      {
        tableItemsList: [
          {id: 1, value: true, caption: 'Да'},
          {id: 2, value: false, caption: 'Нет'}
        ],
        tableColumns: [
          {id: 'caption', dataField: 'caption', caption: 'Значение'}
        ]
      }
    ));
  }

  public updateItems(): Promise<boolean> {
    return of(true).toPromise();
  }
}
