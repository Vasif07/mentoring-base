import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderDatePipe } from '../pipes/date.pipe';
import { EDitPhoneNumberPipe } from '../pipes/phone-number.pipe';


const getMenuItem = (arg: string): string => {
    console.log("Receive item: " + arg);              
    const result = "Received item: " + arg;            
    console.log(result);                               
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
  imports: [NgIf, NgFor, RouterLink, HeaderDatePipe, EDitPhoneNumberPipe]
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

  someDate = new Date();
}
