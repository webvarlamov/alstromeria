import {TypeFinderService} from "../service/type-finder-service";
import {CommonRequest} from "./common.request";

export interface ObjectStateChangeRequest {
    payload: CommonRequest
    typeFinderService: TypeFinderService
}
