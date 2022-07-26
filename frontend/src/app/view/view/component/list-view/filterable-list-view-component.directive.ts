import {Directive, Injector} from '@angular/core';
import {ListViewComponent} from "./list-view.component";
import {HasId} from "../../../../service/http/model/pageable";

@Directive({
  selector: 'app-filterable-list-view-component'
})
export class FilterableListViewComponent<T extends HasId> extends ListViewComponent<T> {
  public listViewFiltersAsyncState: any = {};
  public listViewFiltersAsyncStateManager: any = {};

  constructor(public injector: Injector,) {
    super(injector);
  }
}
