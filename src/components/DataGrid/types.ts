export interface IPageResult {
  list: Array<Record<string, any>>;
  total: number;
  pageSize?: number;
  current?: number;
}

export interface IPageable {
  pageSize: number;
  current: number;
}

export type DataGridModeType = 'table' | 'list' | 'card';

export type LoadDataType = (pageable: IPageable, filterParams: any) => Promise<IPageResult>;
