import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TodosState } from "./todos.reducer";
import { Todo } from "../todos-list.component";


export const selectTodosFeature = createFeatureSelector<TodosState>('todos');

export const selectTodos = createSelector(
  selectTodosFeature,
  (state: TodosState): Todo[] => state.todos
);
