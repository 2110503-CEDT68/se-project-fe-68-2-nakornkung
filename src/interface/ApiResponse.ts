/* eslint-disable @typescript-eslint/no-empty-object-type */
export type ApiResponse<T, Extra = {}> = { success: true; data: T; } & Extra | { success: false; message: string; }

export type PaginatedApiResponse<T> = ApiResponse<T, { total: number }>
