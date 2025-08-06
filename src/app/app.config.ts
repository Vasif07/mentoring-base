import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { userReducer } from './users-list/store/users.reducer';
import { todoReducer } from './todos-list/store/todos.reducer';
import { provideEffects } from '@ngrx/effects';
import { UsersEffects } from './users-list/store/user.effects';
import { TodosEffects } from './todos-list/store/todo.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideStore({
        users: userReducer,
        todos: todoReducer,
    }),
    provideEffects([UsersEffects, TodosEffects]),
]
};
