import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Todo } from "../todos-list.component";
import { NgFor } from "@angular/common";

@Component ({
    selector: 'app-todos-card',
    templateUrl:'./todo-card.component.html',
    styleUrl: './todo-card.component.scss',
    standalone: true,
    imports: [NgFor]
})

export class TodosCardComponent {
 @Input()
  todo!: Todo;
  
  @Output()
  deleteTodo = new EventEmitter<number>()

  onDeleteTodo(id: number) {
    this.deleteTodo.emit(id)
  }
}