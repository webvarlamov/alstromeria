import {EntitiesLoadOptions} from "../../../../service/http/model/entities-load-options";
import {FilterExpression} from "../../../../service/http/model/filter-expression";
import {Pageable} from "../../../../service/http/model/pageable";
import {Observable} from "rxjs";

export interface SuggestionsDataAccessService {
  loadEntities<T>(domainType: string, options?: EntitiesLoadOptions, expression?: FilterExpression): Observable<Pageable<T>>;
  loadSuggestions(domainType: string, search: string, attributeKey: string, expression?: FilterExpression): Observable<Array<string>>;
}
