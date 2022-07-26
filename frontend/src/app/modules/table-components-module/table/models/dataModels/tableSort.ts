export interface TableSort {
  dataField: string;
  order: SortOrder
}

export enum SortOrder {
  ASC='asc', DESC='desc'
}
