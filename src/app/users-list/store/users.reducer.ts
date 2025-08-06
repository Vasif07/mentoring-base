import { createReducer, on } from "@ngrx/store";
import { User } from "../users-list.component";
import { UsersActions } from "./user.actions";

export interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

export const userReducer = createReducer<UsersState>(
  initialState,
  on(UsersActions.loadSuccess, (state, { users }): UsersState => ({
  ...state,
  users,
  })),
  on(UsersActions.edit, (state, { editedUser }): UsersState => ({
  ...state,
    users: state.users.map(user =>
      user.id === editedUser.id
        ? editedUser
        : user
    ),
  })),
  on(UsersActions.create, (state, { user }): UsersState => ({
  ...state,
  users: [...state.users, user],
  })),
  on(UsersActions.delete, (state, { id }): UsersState => ({
  ...state,
  users: state.users.filter(user => user.id !== id),
  })),
);
