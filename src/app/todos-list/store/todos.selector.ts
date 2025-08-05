import { createSelector } from "@ngrx/store";
import { TodosState } from "./todos.reducer";

interface AppState {
  todos: TodosState;
}

export const selectTodosFeature = (state: AppState) => state.todos;

export const selectTodos = createSelector(
    selectTodosFeature,
    (state: TodosState) => state.todos
);

export const selectTitleIsUnique = createSelector(
  selectTodosFeature,
  (state: TodosState) => state.titleIsUnique
);