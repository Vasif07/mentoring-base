import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodosActions } from './todo.actions';
import { map, catchError, of, mergeMap } from 'rxjs';
import { TodosApiService } from '../../todos-api.service';
import { Todo } from '../todos-list.component';

@Injectable()
export class TodosEffects {
  private readonly actions$ = inject(Actions);
  private readonly todoApi = inject(TodosApiService);

  loadTodos$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TodosActions.load),
        mergeMap(() =>
          this.todoApi.getTodos().pipe(
            map((todos: Todo[]) => TodosActions.loadSuccess({ todos })),
            catchError((error: Error) => of(TodosActions.loadFailure({ error })))
          )
        )
      )
  );
}
