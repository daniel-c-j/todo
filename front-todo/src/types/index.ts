type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type Priority = "low" | "medium" | "high" | "none";

type Category = {
  id: number;
  name: string;
  color: string;
  created_at?: Date;
  updated_at?: Date;
};

type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  created_at?: Date;
  updated_at?: Date;
  Category: Category;
};

type AllowedSortBy = "created_at" | "updated_at" | "title";
type AllowedSortOrder = "ASC" | "DESC";

type TodoContextType = {
  data: Todo[];
  category: Category[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  category_id?: number;
  sort_by: AllowedSortBy;
  sort_order: AllowedSortOrder;
  completed?: boolean;
  priority?: Priority;
  title?: string;
  page?: number;
  limit?: number;
};

export type {
  Category,
  Priority,
  Method,
  Todo,
  TodoContextType,
  AllowedSortBy,
  AllowedSortOrder,
};
