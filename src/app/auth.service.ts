import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface AuthUser {
  name: string;
  isAdmin: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    userSubject = new BehaviorSubject<AuthUser | null>(null);
    readonly user$ = this.userSubject.asObservable();

    loginAsAdmin():void {
        const admin: AuthUser = { name: 'Admin', isAdmin: true };
        this.userSubject.next(admin);
    }

    loginAsUser():void {
        const user: AuthUser = { name: 'User', isAdmin: false };
        this.userSubject.next(user);
    }

    logout(): void {
        this.userSubject.next(null);
    }

    IsAdmin(): boolean {
        const user: AuthUser | null = this.userSubject.value;
        return user?.isAdmin === true;
    }

    getCurrentUser(): AuthUser | null {
        return this.userSubject.value;
    }
}