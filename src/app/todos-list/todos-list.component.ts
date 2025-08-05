import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AsyncPipe, NgFor } from "@angular/common";
import { TodosCardComponent } from "./todo-card/todo-card.component";
import { CreateTodoFormComponent } from "../create-todo-form/create-todo-form.component";
import { Store } from "@ngrx/store";
import { TodosActions } from "./store/todo.actions";
import { selectTodos } from "./store/todos.selector";

export interface Todo {
    id?: number;
    title: string;
    userId: number;
    completed: boolean;
  }

@Component ({
    selector: 'app-todos-list',
    templateUrl:'./todos-list.component.html',
    styleUrl: './todos-list.component.scss',
    standalone: true,
    imports: [NgFor, TodosCardComponent, AsyncPipe, CreateTodoFormComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodosListComponent {
    private readonly store = inject(Store);
    public readonly todos$ = this.store.select(selectTodos);
  
    constructor() {
        this.store.dispatch(TodosActions.load());
    }
  
    deleteTodo(id: number) {
        this.store.dispatch(TodosActions.delete({ id }));
    }

    createTodo(formData: Todo): void {
        const newTodo: Todo = {
            id: new Date().getTime(),
            title: formData.title,
            userId: formData.userId,
            completed: formData.completed,
        };

        this.store.dispatch(TodosActions.create({ todo: newTodo }));
    }
}
