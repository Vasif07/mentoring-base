import { NgIf } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component ({
    selector: 'app-create-user-form',
    templateUrl: './create-user-form.html',
    styleUrl: './create-user-form.scss',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf],
})
export class CreateUserFormComponent {
    @Output ()
    createUser = new EventEmitter();

    public form = new FormGroup({
        name: new FormControl('null', [Validators.required, Validators.minLength(2)]),
        email: new FormControl('null', [Validators.required, Validators.email]),
        website: new FormControl('null', [Validators.required, Validators.minLength(3)]),
        companyName: new FormControl('null', [Validators.required, Validators.minLength(2)]),
    });
    
    public submitForm(): void {
        this.createUser.emit(this.form.value);
        this.form.reset();
    }
}
