import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { HeaderComponent } from './header/header.component';
import { TodosListComponent } from './todos-list/todos-list.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { adminAuthGuard } from './guards/admin-auth.guard';

export const routes: Routes = [
  { 
    path:'users', 
    component: UsersListComponent
  },
  
  { 
    path:'', 
    component: HeaderComponent
  },

  {
    path: 'todos',
    component: TodosListComponent
  },

  {
    path: 'admin-user',
    component: AdminUserComponent,
    canActivate: [adminAuthGuard]
  }
];
