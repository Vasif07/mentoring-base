import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../users-list.component";

export const UsersActions = createActionGroup({
    source: 'Users',
    events: {
        'load': emptyProps(),
        'loadSuccess': props<{ users: User[] }>(),
        'loadFailure': props<{ error: Error }>(),
        'edit': props<{ editedUser: User }>(),
        'create': props<{ user: User }>(),
        'delete': props<{ id: number }>(),
    },
})