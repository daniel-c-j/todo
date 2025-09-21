import React, { createContext, useCallback, useEffect, useReducer } from "react";
import type { Category, Todo, TodoContextType } from "../types";
import axios, { AxiosError } from "axios";
import { HOST, PORT } from "../constants";

const initialState: TodoContextType & { dispatch: React.ActionDispatch<[action: TodoAction]>, forceRefresh: boolean } = {
  data: [],
  category: [],
  isLoading: false,
  isError: false,
  errorMessage: undefined,
  category_id: -1,
  sort_by: "created_at",
  sort_order: "DESC",
  completed: false,
  priority: "none",
  title: undefined,
  dispatch: () => { },
  forceRefresh: false,
};

export type TodoAction =
  | { type: "FORCE_REFRESH" }
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS_TODO"; payload: Todo[] }
  | { type: "FETCH_SUCCESS_CATEGORY"; payload: Category[] }
  | { type: "FETCH_CLEAR" }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "SET_FILTERS"; payload: Partial<typeof initialState> }
  | { type: "SET_PAGE"; payload: number }
  | { type: "CLEAR_PAGE_LIMIT" }
  | { type: "CLEAR" };

function reducer(state: typeof initialState, action: TodoAction) {
  switch (action.type) {
    case "FORCE_REFRESH":
      return { ...state, forceRefresh: !state.forceRefresh };
    case "FETCH_START":
      return { ...state, isLoading: true, isError: false };
    case "FETCH_SUCCESS_CATEGORY":
      return { ...state, isLoading: false, category: action.payload, isError: false };
    case "FETCH_SUCCESS_TODO":
      return { ...state, isLoading: false, data: action.payload, isError: false };
    case "FETCH_CLEAR":
      return { ...state, isLoading: false, isError: false };
    case "FETCH_ERROR":
      return { ...state, isLoading: false, isError: true, errorMessage: action.payload };
    case "SET_FILTERS":
      return { ...state, ...action.payload };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "CLEAR_PAGE_LIMIT":
      return { ...state, page: 1, limit: 10 };
    case "CLEAR":
      return { ...initialState };
    default:
      return state;
  }
}

const TodoContext = createContext<TodoContextType & { dispatch: React.ActionDispatch<[action: TodoAction]>, forceRefresh: boolean }>(initialState);
export { TodoContext }

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetch = useCallback(async () => {
    dispatch({ type: "FETCH_START" });

    try {
      const catg = await axios({ method: "GET", url: `${HOST}:${PORT}/api/categories` });
      dispatch({ type: "FETCH_SUCCESS_CATEGORY", payload: catg.data });

      const qs = new URLSearchParams();
      if (state.category_id && state.category_id !== -1) qs.set("category_id", String(state.category_id));
      if (state.completed !== undefined) qs.set("completed", String(state.completed));
      if (state.priority) qs.set("priority", state.priority);
      if (state.title) qs.set("title", state.title);
      if (state.sort_by) qs.set("sort_by", state.sort_by ?? "created_at");
      if (state.sort_order) qs.set("sort_order", state.sort_order ?? "DESC");
      if (state.page) qs.set("page", String(state.page ?? 1));
      if (state.limit) qs.set("limit", String(state.limit ?? 10));

      const todo = await axios({ method: "GET", url: `${HOST}:${PORT}/api/todos?${qs.toString()}` });
      dispatch({ type: "FETCH_SUCCESS_TODO", payload: todo.data.data });
    } catch (err) {
      const axiosError = err as AxiosError;
      dispatch({ type: "FETCH_ERROR", payload: axiosError.message });
    }
  }, [
    state.category_id,
    state.sort_by,
    state.sort_order,
    state.completed,
    state.priority,
    state.title,
    state.page,
    state.limit
  ]);

  // To auto-fetch when filters/page/limit change
  useEffect(() => {
    fetch();
  }, [fetch, state.forceRefresh]);

  const contextValue: TodoContextType & { dispatch: React.ActionDispatch<[action: TodoAction]>, forceRefresh: boolean } = {
    ...state,
    dispatch,
  };

  return <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>;
};

