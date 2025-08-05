import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./users-list/users-list.component";

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  readonly apiService = inject(HttpClient);
  readonly BASE_URL = 'https://jsonplaceholder.typicode.com/users';

  getUsers(): Observable<User[]> {
    return this.apiService.get<User[]>(this.BASE_URL);
  }

  createUser(user: User): Observable<User> {
    return this.apiService.post<User>(this.BASE_URL, user);
  }

  editUser(user: User): Observable<User> {
    return this.apiService.put<User>(`${this.BASE_URL}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.BASE_URL}/${id}`);
  }
}


