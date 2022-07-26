import {Observable} from "rxjs";
import {FilterExpression} from "../model/filter-expression";
import {HasId} from "../model/pageable";

export interface CrudRepository<S extends HasId> {
    save(entity: S): Observable<S>;

    saveAll(entities: Iterable<S>): Observable<Iterable<S>>;

    findById(id: string): Observable<S>;

    existsById(id: string): Observable<boolean>;

    exists(filterExpression?: FilterExpression): Observable<boolean>;

    findAll(filterExpression?: FilterExpression): Observable<Iterable<S>>;

    count(filterExpression?: FilterExpression): Observable<number>;

    findAllById(ids: Iterable<string>): Observable<Iterable<S>>;

    deleteById(id: string): Observable<void>;

    delete(entity: S): Observable<void>;

    deleteAllById(ids: Iterable<string>): Observable<void>;

    deleteAllEntities(args: {entities: Array<S>}): Observable<void>;

    deleteAll(): Observable<void>;
}
