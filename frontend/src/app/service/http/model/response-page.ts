import {HasId} from "./pageable";

export interface ResponsePage<Item extends HasId> {
  page: number,
  size: number,
  pagesCount: number,
  itemsCount: number,
  sort: {
    unsorted: true,
    sorted: false,
    empty: true
  },
  items: Array<Item>
}
