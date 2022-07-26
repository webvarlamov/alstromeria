import {HasId} from "../service/http/model/pageable";

export interface Plan extends HasId{
  id: string;
  name?: string;
  description?: string;
  storyList?: Array<any>;
}
