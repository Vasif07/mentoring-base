import { NgIf } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Todo } from "../todos-list/todos-list.component";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from "@angular/common";

interface TodoFormValue {
    title: string;
    userId: string;
    completed: boolean;
}

@Component ({
    selector: 'app-create-todo-form',
    templateUrl: './create-todo-form.component.html',
    styleUrl: './create-todo-form.component.scss',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf, MatButtonModule, MatInputModule, MatFormFieldModule, CommonModule],
})

export class CreateTodoFormComponent {
    @Output()
    createTodo = new EventEmitter<Todo>();
    
    public form = new FormGroup({
        title: new FormControl('null', [Validators.required, Validators.minLength(3)]),
        userId: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(11)]),
        completed: new FormControl(false, [Validators.required, Validators.minLength(2), Validators.pattern(/^(да|нет)$/i) ]),
    });
        
    public submitForm(): void {
        if (this.form.invalid) return;

    const formValue = this.form.value as TodoFormValue;

    const newTodo: Todo = {
        title: formValue.title,
        userId: Number(formValue.userId) || 0,
        completed: formValue.completed,
    };

    this.createTodo.emit(newTodo);
    this.form.reset();
  }
} 