import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodosActions } from './todo.actions';
import { switchMap, map, catchError, of, mergeMap, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { TodosApiService } from '../../todos-api.service';
import { selectTodos } from './todos.selector';
import { Todo } from '../todos-list.component';

@Injectable()
export class TodosEffects {
  private readonly actions$ = inject(Actions);
  private readonly todoApi = inject(TodosApiService);
  private readonly store = inject(Store);

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.load),
      switchMap(() =>
        this.todoApi.getTodos().pipe(
          map(todos => TodosActions.set({ todos })),
          catchError(() => of({ type: '[Todos Api] Load Error'}))
        )
      )
    )
  );

  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.create),
      mergeMap(({ todo }) =>
        this.todoApi.createTodo(todo).pipe(
          map(createdTodo => TodosActions.createSuccess({ todo: createdTodo })),
          catchError(error => of({ type: '[Todos API] Error', error }))
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.delete),
      switchMap(({ id }) =>
        this.todoApi.deleteTodo(id).pipe(
          map(() => TodosActions.deleteSuccess({ id })),
          catchError(error => of({ type: '[Todos API] Delete Error', error }))
        )
      )
    )
  );
  
  checkTitleUnique$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.checkTitleUnique),
      switchMap(({ title }) =>
        this.store.select(selectTodos).pipe(
          take(1),
          map((todos: Todo[]) => {
            const isUnique = !todos.some(todo => todo.title.toLowerCase() === title.toLowerCase());
            return TodosActions.checkTitleUniqueSuccess({ isUnique });
          }),
          catchError(error =>
            of(TodosActions.checkTitleUniqueFailure({ error }))
          )
        )
      )
    )
  );
}
