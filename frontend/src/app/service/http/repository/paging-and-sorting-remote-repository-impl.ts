import {PagingAndSortingRepository} from "./paging-and-sorting-repository";
import {FilterExpression} from "../model/filter-expression";
import {forkJoin, Observable} from "rxjs";
import {Page} from "../model/page";
import {HasId} from "../model/pageable";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ResponsePage} from "../model/response-page";
import {TableSort} from "../../../modules/table-components-module/table/models/dataModels/tableSort";

export abstract class PagingAndSortingRemoteRepositoryImpl<S extends HasId> implements PagingAndSortingRepository<S> {
  protected constructor(
    public http: HttpClient
  ) {}

  public count(filterExpression?: FilterExpression): Observable<number> {
    const url = this.getURL(this.count, {filterExpression});

    let params = new HttpParams();
    params = filterExpression ? params.append('expression', JSON.stringify(filterExpression)) : params;
    return this.http.get(url, {params}) as Observable<number>
  }

  public delete(entity: S): Observable<void> {
    const url = this.getURL(this.delete, {entity});

    this.http.delete(url)
    return undefined;
  }

  public deleteAll(): Observable<void> {
    const url = this.getURL(this.deleteAll);

    return undefined;
  }

  public deleteAllById(ids: Iterable<string>): Observable<void> {
    const url = this.getURL(this.deleteAllById, {ids});

    return undefined;
  }

  public deleteAllEntities(args: {entities: Array<HasId>}): Observable<any> {
    const url = this.getURL(this.deleteAllEntities, args);
    const requestsArray$ = args.entities.map(entity => {
      let params = new HttpParams();
      params = params.set("id", entity.id)
      return this.http.delete(url + "/deleteById", {params})
    });

    return forkJoin(requestsArray$);
  }

  public deleteById(id: string): Observable<void> {
    const url = this.getURL(this.deleteById, {id});

    return undefined;
  }

  public exists(filterExpression?: FilterExpression): Observable<boolean> {
    const url = this.getURL(this.exists, {filterExpression});

    return undefined;
  }

  public existsById(id: string): Observable<boolean> {
    const url = this.getURL(this.existsById, {id});

    return undefined;
  }

  public findAll(filterExpression?: FilterExpression): Observable<Iterable<S>> {
    const url = this.getURL(this.findAll, {filterExpression});

    return undefined;
  }

  public findAllById(ids: Iterable<string>): Observable<Iterable<S>> {
    const url = this.getURL(this.findAllById, {ids});

    return undefined;
  }

  public findAllEntitiesOnPage<S extends HasId>(args: {
    page: Page,
    sort: Array<TableSort>,
    filterExpression?: FilterExpression,
    fetchStrategy: string
  }): Observable<ResponsePage<S>> {
    const url = this.getURL(this.findAllById, args);

    let params = new HttpParams();

    params = params.set("page", args?.page?.page)
    params = params.set("size", args?.page?.size)
    params = params.set("fetchStrategy", args?.fetchStrategy)
    params = params.set("filterExpression", JSON.stringify(args?.filterExpression))

    if (args?.sort != null) {
      args?.sort.forEach(s => {
        params = params.set("sort", [s.dataField, s.order].join(","))
      })
    }

    return this.http.get(url + "/findAll", {params}) as Observable<ResponsePage<S>>;
  }

  public findAllSuggestionsOnPage(args: {
    page: Page,
    sort: Array<TableSort>,
    filterExpression?: FilterExpression,
    attributeKey: string
  }): Observable<ResponsePage<any>> {
    const url = this.getURL(this.findAllById, args);

    let params = new HttpParams();

    params = params.set("page", args?.page?.page)
    params = params.set("size", args?.page?.size)
    params = params.set("attributeKey", args?.attributeKey)

    if (args.filterExpression != null) {
      params = params.set("filterExpression", JSON.stringify(args.filterExpression))
    }

    return this.http.get(url + "/findSuggestions", {params}) as Observable<ResponsePage<any>>
  }

  public findById(id: string): Observable<S> {
    const url = this.getURL(this.findById, {id});

    return undefined;
  }

  public save(entity: S): Observable<S> {
    const url = this.getURL(this.save, {entity});

    return undefined;
  }

  public saveAll(entities: Iterable<S>): Observable<Iterable<S>> {
    const url = this.getURL(this.saveAll, {entities});

    return undefined;
  }

  protected abstract getURL(method: any, methodArgs?: any): string;
}
