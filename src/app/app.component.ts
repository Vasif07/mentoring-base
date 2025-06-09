import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { Router } from '@angular/router';


const getMenuItem = (arg: string): string => {
  console.log("Receive item: " + arg);              
  const result = "Received item: " + arg;            
  console.log(result);                               
  return arg;  
}

const newPages: number[] = [5,4,3,2,1]

const menuItems: string[] = ["Каталог","Стройматериалы","Инструменты","Электрика","Интерьер и одежда"]

const upperCaseMenuItems: string[] = menuItems.map(
  (item:string) => {
  return item.toUpperCase();
  }
)

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf,NgFor, RouterLink, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mentoring-first-project';

  isShowCatalog: boolean = false;

  readonly headerItem1: string = "Пользователи";
  readonly headerItem3: string = "Каталог";
  readonly aboutCompany: string =getMenuItem("О компании");

  isShowImg: boolean = true;

  readonly newPages: number[] = newPages;

  isUpperCase: boolean = true;

  menuItems: string[] = upperCaseMenuItems

  changeMenuText() {
    this.menuItems = upperCaseMenuItems.map(
    (item:string) => this.isUpperCase ? item.toLowerCase() : item.toUpperCase()
    )
  
    this.isUpperCase = !this.isUpperCase
  }

}


const user = {
  name: 'Ilnur',
  surname:'Ryazhapov',
  height: 185,
  weight: 100
}

user.name = 'Petr'

console.log(user)