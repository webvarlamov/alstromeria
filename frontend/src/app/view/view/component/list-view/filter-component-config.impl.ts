import {FilterComponentConfig} from "./filter-config.interface";
import {
  InputComponentConfig
} from "../../../../modules/input-components-module/components/input-component/input.component";


export class FilterComponentConfigImpl implements FilterComponentConfig {
  inputConfig: InputComponentConfig;
  inputDetailsConfig: any;
  suggestionsConfig: any;


  constructor(args: FilterComponentConfig) {
  }
}
