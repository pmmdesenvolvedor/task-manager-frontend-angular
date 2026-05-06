export interface Task {
  id: string;
  title: string;
  description: string;
  done: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFilters {
  page?: number;
  limit?: number;
  done?: boolean;
  search?: string;
  sortBy?: 'createdAt' | 'title';
  order?: 'asc' | 'desc';
}

export interface CreateTaskInput {
  title: string;
  description: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  done?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
