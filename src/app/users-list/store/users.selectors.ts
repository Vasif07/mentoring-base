import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersState } from "./users.reducer";
import { User } from "../users-list.component";


export const selectUsersFeature = createFeatureSelector<UsersState>('users');

export const selectUsers = createSelector(
  selectUsersFeature,
  (state: UsersState): User[] => state.users
);
