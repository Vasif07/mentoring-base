import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Todo } from "../todos-list.component";

export const TodosActions = createActionGroup({
    source: 'Todos',
    events: {
        'load': emptyProps(),
        'set': props<{ todos: Todo[] }>(),
        'create': props<{ todo: Todo }>(),
        'delete': props<{ id: number }>(),
        'createSuccess': props<{ todo: Todo }>(),
        'deleteSuccess': props<{ id: number }>(),
        'checkTitleUnique': props<{ title: string }>(),
        'checkTitleUniqueSuccess': props<{ isUnique: boolean }>(),
        'checkTitleUniqueFailure': props<{ error: Error }>(),
    }
})