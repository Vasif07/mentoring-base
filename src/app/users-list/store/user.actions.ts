import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../users-list.component";

export const UsersActions = createActionGroup({
    source: 'Users',
    events: {
        'load': emptyProps(),
        'set': props<{ users: User[] }>(),
        'edit': props<{ editedUser: User }>(),
        'create': props<{ user: User }>(),
        'delete': props<{ id: number }>(),
        'editSuccess': props<{ user: User }>(),
        'createSuccess': props<{ user: User }>(),
        'deleteSuccess': props<{ id: number }>(),
        'checkEmailUnique': props<{ email: string }>(),
        'checkEmailUniqueSuccess': props<{ isUnique: boolean }>(),
        'checkEmailUniqueFailure': props<{ error: Error }>(),
    },
})