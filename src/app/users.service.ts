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
        const existingUser = this.usersSubject.value.find(
            currentElement => currentElement.email === user.email
        );

        if (existingUser) {
            alert('ТАКОЙ EMAIL УЖЕ ЗАРЕГИСТРИРОВАН');
            return;
          }
          
            this.usersSubject.next([...this.usersSubject.value, user]);
            alert('НОВЫЙ ПОЛЬЗОВАТЕЛЬ УСПЕШНО ДОБАВЛЕН');
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


