import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersActions } from './user.actions';
import { UsersApiService } from '../../users-api.service';
import { map, catchError, of, mergeMap } from 'rxjs';
import { User } from '../users-list.component';


@Injectable()
export class UsersEffects {
  private readonly actions$ = inject(Actions);
  private readonly userApi = inject(UsersApiService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.load),
      mergeMap(() =>
        this.userApi.getUsers().pipe(
          map((users: User[]) => UsersActions.loadSuccess({ users })),
          catchError((error: Error) => of(UsersActions.loadFailure({ error })))
        )
      )
    )
 );
}
