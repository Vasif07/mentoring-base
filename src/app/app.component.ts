import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

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

console.log(upperCaseMenuItems)

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf,NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mentoring-first-project';

  isShowCatalog: boolean = false;

  readonly headerItem1: "Главная" = "Главная";
  readonly headerItem3: "Каталог" = "Каталог";
  readonly aboutCompany: string =getMenuItem("О компании");

  isShowImg: boolean = true;

  readonly newPages: number[] = newPages;

  isUpperCase: boolean = true;

  menuItems: string[] = upperCaseMenuItems

  changeMenuText() {
    this.menuItems = upperCaseMenuItems.map(
      item => this.isUpperCase ? item.toLowerCase() : item.toUpperCase()
    )
  
    this.isUpperCase = !this.isUpperCase
  }
}


