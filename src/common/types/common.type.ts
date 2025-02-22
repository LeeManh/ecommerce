export interface IPagination {
  pageIndex: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export type FindAllResponse<T> = { data: T[]; metadata: IPagination };
