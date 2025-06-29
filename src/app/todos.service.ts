import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Todo } from "./todos-list/todos-list.component";

@Injectable({providedIn:'root'})
export class TodosService {
    todosSubject = new BehaviorSubject<Todo[]>([]);
    readonly todos$ = this.todosSubject.asObservable();

    setTodos(todos: Todo[]) {
        this.todosSubject.next(todos);
    }

    editTodo(editedTodo: Todo) {
        this.todosSubject.next(
          this.todosSubject.value.map(
            (todo: Todo) => 
              todo.id === editedTodo.id 
                ? editedTodo 
                : todo
            )
        );
    }

    createTodo(todo: Todo) {
        const existingTodo = this.todosSubject.value.find(
            currentElement => currentElement.title === todo.title
        );

        if (existingTodo) {
            alert('ТАКАЯ ЗАДАЧА УЖЕ СУЩЕСТВУЕТ');
            return;
          }
          
          this.todosSubject.next([...this.todosSubject.value, todo]);
          alert('НОВАЯ ЗАДАЧА  УСПЕШНО ДОБАВЛЕНА');
    }

    deleteTodo(id: number) {
        this.todosSubject.next(
            this.todosSubject.value.filter(
                (todo: Todo) => {
                  return todo.id !== id;
                }
            )
        )
    }
}


