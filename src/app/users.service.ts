import { Injectable } from "@angular/core";
import { User } from "./users-list/users-list.component";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn:'root'})
export class UsersService {
    private usersSubject = new BehaviorSubject<User[]>([]);
    readonly users$ = this.usersSubject.asObservable();

    setUsers(users: User[]) {
        this.usersSubject.next(users);
    }

    editUser(editedUser: User) {
        this.usersSubject.next(
          this.usersSubject.value.map(
            (user: User) => 
              user.id === editedUser.id 
                ? editedUser 
                : user
            )
        );
    }

    createUser(user: User) {
        this.usersSubject.next(
            [...this.usersSubject.value, user]
        )
    }

    deleteUser(id: number) {
        this.usersSubject.next(
            this.usersSubject.value.filter(
                (user: User) => {
                  return user.id !== id;
                }
            )
        )
    }
}

