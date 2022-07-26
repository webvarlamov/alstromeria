import {CrudRepository} from "./crud-repository";
import {Observable} from "rxjs";
import {HasId, Pageable} from "../model/pageable";
import {Page} from "../model/page";
import {FilterExpression} from "../model/filter-expression";
import {TableSort} from "../../../modules/table-components-module/table/models/dataModels/tableSort";
import {ResponsePage} from "../model/response-page";

export interface PagingAndSortingRepository<S extends HasId> extends CrudRepository<S> {
    findAllEntitiesOnPage<S>(args: { page: Page, sort: Array<TableSort>, filterExpression?: FilterExpression, fetchStrategy: string }): Observable<ResponsePage<HasId>>;
    findAllSuggestionsOnPage<S>(args: { page: Page, sort: Array<TableSort>, filterExpression?: FilterExpression, attributeKey: string }): Observable<ResponsePage<HasId>>;
}
