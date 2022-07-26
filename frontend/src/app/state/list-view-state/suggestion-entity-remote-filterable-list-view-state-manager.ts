import {RemoteFilterableListViewStateManager} from "./remote-filterable-list-view-state-manager";
import {SuggestionFilterableListViewStateManager} from "./suggestion-filterable-list-view-state-manager";
import {SuggestionOwnerInputEvent} from "../../modules/input-components-module/components/input-component/input.component";

export class SuggestionEntityRemoteFilterableListViewStateManager extends RemoteFilterableListViewStateManager implements SuggestionFilterableListViewStateManager{
  onSuggestionOwnerValueChangeEvent(args: SuggestionOwnerInputEvent): void {
  }
}
