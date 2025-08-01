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
        const adminAuthUser: AuthUser = { name: 'Admin', isAdmin: true };
        this.userSubject.next(adminAuthUser);
    }

    loginAsUser():void {
        const normalAuthUser: AuthUser = { name: 'User', isAdmin: false };
        this.userSubject.next(normalAuthUser);
    }

    logout(): void {
        this.userSubject.next(null);
    }

    IsAdmin(): boolean {
        const user = this.userSubject.value;
        return user?.isAdmin === true;
    }

    getCurrentUser(): AuthUser | null {
        return this.userSubject.value;
    }
}