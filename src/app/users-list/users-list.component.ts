import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { UsersApiService } from "../users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "../users.service";
import { CreateUserFormComponent } from "../create-user-form/create-user-form.component";

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
    readonly usersApiService = inject(UsersApiService);
    readonly usersService = inject(UsersService);
  
    constructor() {
        this.usersApiService.getUsers().subscribe(
            (response: User[]) => {
                this.usersService.setUsers(response);
            }
    )

    this.usersService.users$.subscribe(
      (users) => console.log(users)
    );
}

    deleteUser(userId: number): void {
        this.usersService.deleteUser(userId);
    }

    editUser(updatedUser: User): void {
        this.usersService.editUser(updatedUser);
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

        this.usersService.addUser(user);
    }
}
