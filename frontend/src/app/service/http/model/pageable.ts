import {Page} from './page';
import {Linked} from './linked';

export interface Pageable<T> extends Linked {
  page?: Page;
  _embedded: { [domainType: string]: Array<T> };
}

export interface HasId {
  id: string;
}

export const emptyPageable: Pageable<any> = {
  page: {
    size: 0,
    itemsCount: 0,
    pagesCount: 0,
    page: 0,
  },
  _embedded: {
    entities: []
  }
};
