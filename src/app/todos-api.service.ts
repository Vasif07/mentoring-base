import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Todo } from "./todos-list/todos-list.component";

@Injectable({ providedIn: 'root' })
export class TodosApiService {
  readonly apiService = inject(HttpClient);
  readonly BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

  getTodos(): Observable<Todo[]> {
    return this.apiService.get<Todo[]>(this.BASE_URL);
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.apiService.post<Todo>(this.BASE_URL, todo);
  }

  deleteTodo(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.BASE_URL}/${id}`);
  }
}


