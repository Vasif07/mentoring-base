import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Todo } from "./todos-list/todos-list.component";

@Injectable({providedIn: 'root'})
export class TodosApiService {
    readonly apiService = inject(HttpClient);
    
    getUsers(): Observable<Todo[]> {
        return this.apiService.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
    }
}
