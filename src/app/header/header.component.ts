import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EditPhoneNumberPipe } from '../pipes/phone-number.pipe';
import { CommonModule } from '@angular/common';


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
  imports: [NgIf, NgFor, RouterLink, EditPhoneNumberPipe, CommonModule]
})

export class HeaderComponent {
  readonly headerItem1: string = "Пользователи";
  readonly headerItem3: string = "Каталог";
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
