import { NgIf } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";


@Component ({
    selector: 'app-create-todo-form',
    templateUrl: './create-todo-form.html',
    styleUrl: './create-todo-form.scss',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf],
})

export class CreateTodoFormComponent {
    @Output()
    createTodo = new EventEmitter();
    
    public form = new FormGroup({
        title: new FormControl('null', [Validators.required, Validators.minLength(3)]),
        userId: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(11)]),
        completed: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^(да|нет)$/i) ]),
    });
        
    public submitForm(): void {
        this.createTodo.emit(this.form.value);
        this.form.reset();
    }
} 