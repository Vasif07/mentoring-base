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

    addUser(newUser: User): void {
        const currentUsers = this.usersSubject.value;
        this.usersSubject.next([...currentUsers, newUser]);
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

    createUser(user: User): boolean {
        const existingUser: User | undefined = this.usersSubject.value.find(
            (u: User) => u.email === user.email
        );
  
        if (existingUser) {
            return false;
        }

        this.usersSubject.next([...this.usersSubject.value, user]);
            return true;
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


