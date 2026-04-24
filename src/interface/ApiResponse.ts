/* eslint-disable @typescript-eslint/no-empty-object-type */
export type ApiResponse<T, Extra = {}> = { success: true; data: T; } & Extra | { success: false; message: string; }

interface Page {
  page: number;
  limit: number;
}

interface Pagination {
  next?: Page;
  prev?: Page;
}

export type PaginatedApiResponse<T> = ApiResponse<T, { total: number; pagination: Pagination; }>
