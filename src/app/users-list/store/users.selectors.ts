import { createSelector } from "@ngrx/store";
import { UsersState } from "./users.reducer";

interface AppState {
  users: UsersState;
}

export const selectUsersFeature = (state: AppState) => state.users;

export const selectUsers = createSelector(
  selectUsersFeature,
  (state: UsersState) => state.users
);

export const selectEmailIsUnique = createSelector(
  selectUsersFeature,
  (state: UsersState) => state.emailIsUnique
);