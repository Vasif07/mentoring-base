import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { UserCardComponent } from "./user-card/user-card.component";
import { CreateUserFormComponent } from "../create-user-form/create-user-form.component";
import { Store } from "@ngrx/store";
import { UsersActions } from "./store/user.actions";
import { selectUsers } from "./store/users.selectors";

export interface User {
    id: number;
    name: string;
    username?: string;
    email: string;
    address?: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo?: {
        lat: string;
        lng: string;
      };
    };
    phone?: string;
    website: string;
    company: {
      name: string;
      catchPhrase?: string;
      bs?: string;
    };
  }

export interface CreateUser {
    name: string;
    email: string;
    website: string;
    companyName: string;
  }
  
@Component({
    selector: 'app-users-list',
    templateUrl:'./users-list.component.html',
    styleUrl: './users-list.component.scss',
    standalone: true,
    imports: [NgFor, UserCardComponent, AsyncPipe, CreateUserFormComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersListComponent {
    private readonly store = inject(Store);
    public readonly users$ = this.store.select(selectUsers);
  
    constructor() {
      this.store.dispatch(UsersActions.load());
    }

    deleteUser(userId: number): void {
      this.store.dispatch(UsersActions.delete({ id: userId }));
    }

    editUser(updatedUser: User): void {
      this.store.dispatch(UsersActions.edit({ editedUser: updatedUser  }));
    }

    createUser(newUser: CreateUser): void {
        const user: User = {
            id: Date.now(),
            name: newUser.name,
            email: newUser.email,
            website: newUser.website,
            company: {
              name: newUser.companyName,
            },
        };

      this.store.dispatch(UsersActions.create({ user }));
    }

}
