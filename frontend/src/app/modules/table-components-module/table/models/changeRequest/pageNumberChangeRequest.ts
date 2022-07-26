import {Page} from "../../../../../service/http/model/page";

export interface PageNumberChangeRequest {
    number: number;
    candidate: Page;
}
