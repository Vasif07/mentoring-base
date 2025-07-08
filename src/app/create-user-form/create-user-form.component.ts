import { CommonModule, NgIf } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CreateUser, User } from "../users-list/users-list.component";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";

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

    const formValue = this.form.value as {
        name: string;
        email: string;
        website: string;
        companyName: string;
    };

    const newUser: CreateUser = {
        name: formValue.name,
        email: formValue.email,
        website: formValue.website,
        companyName: formValue.companyName,
    };

    this.createUser.emit(newUser);
    this.form.reset();
  }
}

}
