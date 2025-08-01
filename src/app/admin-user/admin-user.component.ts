import { Component, inject } from "@angular/core";
import { AuthService } from "../auth.service";
import { NgIf } from "@angular/common";
import { Router } from "@angular/router";

@Component ({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.scss',
  standalone: true,
  imports: [NgIf]
})

export class AdminUserComponent {
  authService = inject(AuthService);
}
