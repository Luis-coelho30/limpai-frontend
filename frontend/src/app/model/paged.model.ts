export interface PagedRequest {
  page?: number;
  size?: number;
  sort?: string; 
  filters?: Record<string, string | number | boolean | Array<string | number>>;
}

export interface PagedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; 
}