export type PaginatedResponse<T> = {
  data: T[];
  paging: {
    limit: number;
    offset: number;
    total: number;
  };
};

export type ApiErrorResponse = {
  error?: string;
  message?: string;
};
