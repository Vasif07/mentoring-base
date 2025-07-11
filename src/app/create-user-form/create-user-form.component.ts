import { CommonModule, NgIf } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";

interface CreateUser {
    name: string;
    email: string;
    website: string;
    companyName: string;
}

@Component ({
    selector: 'app-create-user-form',
    templateUrl: './create-user-form.component.html',
    styleUrl: './create-user-form.component.scss',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf,  MatButtonModule, MatInputModule, MatFormFieldModule, CommonModule],
})

export class CreateUserFormComponent {
    @Output ()
    createUser = new EventEmitter<CreateUser>();

    public form = new FormGroup({
        name: new FormControl('null', [Validators.required, Validators.minLength(2)]),
        email: new FormControl('null', [Validators.required, Validators.email]),
        website: new FormControl('null', [Validators.required, Validators.minLength(3)]),
        companyName: new FormControl('null', [Validators.required, Validators.minLength(2)]),
    });
    
    public submitForm(): void {
        if (this.form.valid) {
    const formValue = this.form.value as CreateUser;

    this.createUser.emit(formValue);
    this.form.reset();
    }
  }
}



