export interface EntitiesLoadOptions {
  projection?: string;
  page?: number;
  size?: number;
  sort?: Array<{
    desc: boolean
    selector: string;
  }>;
}
