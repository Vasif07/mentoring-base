import { createReducer, on } from "@ngrx/store";
import { User } from "../users-list.component";
import { UsersActions } from "./user.actions";

export interface UsersState {
  users: User[];
  emailIsUnique: boolean | null;
}

const initialState: UsersState = {
  users: [],
  emailIsUnique: null,
};

export const userReducer = createReducer(
  initialState,
  on(UsersActions.set, (state, { users }) => ({
    ...state,
    users,
  })),
  on(UsersActions.createSuccess, (state, { user }) => ({
  ...state,
  users: [...state.users, user]
  })),
  on(UsersActions.editSuccess, (state, { user }) => ({
  ...state,
  users: state.users.map(u => u.id === user.id ? user : u)
  })),
  on(UsersActions.deleteSuccess, (state, { id }) => ({
  ...state,
  users: state.users.filter(user => user.id !== id)
  })),
  on(UsersActions.checkEmailUniqueSuccess, (state, { isUnique }) => ({
  ...state,
  emailIsUnique: isUnique,
  })),
);
