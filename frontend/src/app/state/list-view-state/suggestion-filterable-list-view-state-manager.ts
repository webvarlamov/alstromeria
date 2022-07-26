import {SuggestionOwnerInputEvent} from "../../modules/input-components-module/components/input-component/input.component";

export interface SuggestionFilterableListViewStateManager {
  onSuggestionOwnerValueChangeEvent(args: SuggestionOwnerInputEvent): void;
}
