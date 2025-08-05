import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersActions } from './user.actions';
import { UsersApiService } from '../../users-api.service';
import { switchMap, map, catchError, of, mergeMap, take } from 'rxjs';
import { selectUsers } from './users.selectors';
import { Store } from '@ngrx/store';
import { User } from '../users-list.component';

@Injectable()
export class UsersEffects {
  private readonly actions$ = inject(Actions);
  private readonly userApi = inject(UsersApiService);
  private readonly store = inject(Store);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.load),
      switchMap(() =>
        this.userApi.getUsers().pipe(
          map(users => UsersActions.set({ users })),
          catchError(() => of({ type: '[Users Api] Load Error'}))
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.create),
      mergeMap(({ user }) =>
        this.userApi.createUser(user).pipe(
          map(createdUser => UsersActions.createSuccess({ user: createdUser })),
          catchError(error => of({ type: '[Users API] Error', error }))
        )
      )
    )
  );

  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.edit),
      switchMap(({ editedUser }) =>
        this.userApi.editUser(editedUser).pipe(
          map(updatedUser => UsersActions.editSuccess({ user: updatedUser })),
          catchError(error => of({ type: '[Users API] Edit Error', error }))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.delete),
      switchMap(({ id }) =>
        this.userApi.deleteUser(id).pipe(
          map(() => UsersActions.deleteSuccess({ id })),
          catchError(error => of({ type: '[Users API] Delete Error', error }))
        )
      )
    )
  );

  checkEmailUnique$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.checkEmailUnique),
      switchMap(({ email }) =>
        this.store.select(selectUsers).pipe(
          take(1),
          map((users: User[]) => {
            const isUnique = !users.some(user => user.email.toLowerCase() === email.toLowerCase());
            return UsersActions.checkEmailUniqueSuccess({ isUnique });
          }),
          catchError(error =>
            of(UsersActions.checkEmailUniqueFailure({ error }))
          )
        )
      )
    )
  );
}
