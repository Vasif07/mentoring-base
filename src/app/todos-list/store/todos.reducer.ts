import { createReducer, on } from "@ngrx/store";
import { Todo } from "../todos-list.component";
import { TodosActions } from "./todo.actions";

export interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};

export const todoReducer = createReducer<TodosState>(
  initialState,
  on(TodosActions.loadSuccess, (state, { todos }): TodosState => ({
  ...state,
  todos,
  })),
  on(TodosActions.create, (state, { todo }): TodosState => ({
  ...state,
  todos: [...state.todos, todo],
  })),
  on(TodosActions.delete, (state, { id }): TodosState => ({
  ...state,
  todos: state.todos.filter(todo => todo.id !== id),
  })),
)