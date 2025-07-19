import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogModule, MatDialogRef, } from "@angular/material/dialog";
import { User } from "../users-list.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatIconModule } from '@angular/material/icon';

export interface EditUser {
  id: number;
  name: string;
  email: string;
  website: string;
  companyName: string;
}

@Component({
    selector: 'app-edit-user-dialog',
    templateUrl: './edit-user-dialog.component.html',
    styleUrls: ['./edit-user-dialog.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, CommonModule, MatDialogClose, MatIconModule],
})

export class EditUserDialogComponent {
  readonly data = inject<{ user: EditUser }>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<EditUserDialogComponent>);
  readonly snackBar = inject(MatSnackBar);

  public form = new FormGroup({
      name: new FormControl(this.data.user.name, [Validators.required, Validators.minLength(2)]),
      email: new FormControl(this.data.user.email, [Validators.required, Validators.email]),
      website: new FormControl(this.data.user.website, [Validators.required, Validators.minLength(3)]),
      companyName: new FormControl(this.data.user.companyName, [Validators.required, Validators.minLength(2)]),
  });

  get userWithUpdatedFields(): User {
    return {
      id: this.data.user.id,
      name: this.form.value.name ?? '',
      email: this.form.value.email ?? '',
      website: this.form.value.website ?? '',
      company: {
      name: this.form.value.companyName ?? '',
      },
    };
 }

  submit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.userWithUpdatedFields);

      this.snackBar.open('Юзер успешно обновлён!', 'ОК', {
      duration: 3000,
      });
    }
 }
}