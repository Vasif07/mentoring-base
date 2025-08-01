import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EditPhoneNumberPipe } from '../pipes/phone-number.pipe';
import { CommonModule } from '@angular/common';
import { BasketDirective } from '../directives/basket.directive';
import { AuthService } from '../auth.service';

const getMenuItem = (arg: string): string => {
  const result = "Received item: " + arg;
  return arg;  
}

const menuItems: string[] = ["Каталог","Стройматериалы","Инструменты","Электрика","Интерьер и одежда"]

const upperCaseMenuItems: string[] = menuItems.map(
  (item:string) => {
  return item.toUpperCase();
  }
)

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, EditPhoneNumberPipe, CommonModule, BasketDirective]
})

export class HeaderComponent {
  constructor (
    public authService: AuthService,
    private router: Router
  ) {}

  loginAsAdmin() {
    this.authService.loginAsAdmin();
    this.router.navigate(['/admin-user']);
  }

  loginAsUser() {
    this.authService.loginAsUser();
  }

  logout() {
    this.authService.logout();
  }

  readonly headerItem1: string = "Пользователи";
  readonly headerItem2: string = "Каталог";
  readonly headerItem3: string = "Только для администраторов";
  readonly aboutCompany: string =getMenuItem("О компании");
  readonly phone: string = "+7 (965) 084-29-29";

  isShowCatalog: boolean = true;

  isUpperCase: boolean = true;

  menuItems: string[] = upperCaseMenuItems

  changeMenuText() {
    this.menuItems = upperCaseMenuItems.map(
    (item:string) => this.isUpperCase 
      ? item.toLowerCase()
      : item.toUpperCase()
    )

    this.isUpperCase = !this.isUpperCase
  }

  someDate: Date = new Date();
}
