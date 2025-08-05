import { createReducer, on } from "@ngrx/store";
import { Todo } from "../todos-list.component";
import { TodosActions } from "./todo.actions";

export interface TodosState {
  todos: Todo[];
  titleIsUnique: boolean | null;
}

const initialState: TodosState = {
  todos: [],
  titleIsUnique: null,
};

export const todoReducer = createReducer(
  initialState,
  on(TodosActions.set, (state, payload) => ({
    ...state,
    todos: payload.todos,
  })),
  on(TodosActions.createSuccess, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
  })),
  on(TodosActions.deleteSuccess, (state, { id }) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id),
  })),
  on(TodosActions.checkTitleUniqueSuccess, (state, { isUnique }) => ({
    ...state,
    titleIsUnique: isUnique,
  })),
)