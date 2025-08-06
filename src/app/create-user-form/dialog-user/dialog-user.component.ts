import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CreateUser } from '../create-user-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../users-list/users-list.component';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { UsersActions } from '../../users-list/store/user.actions';
import { selectUsers } from '../../users-list/store/users.selectors';
import { take } from 'rxjs';


@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrl: './dialog-user.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
})

export class DialogUserComponent {
  private dialogRef = inject(MatDialogRef<DialogUserComponent>);
  readonly snackBar = inject(MatSnackBar);
  private readonly store = inject(Store);

  public form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    website: new FormControl('', [Validators.required, Validators.minLength(3)]),
    companyName: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  submitForm(): void {
    if (this.form.valid) {
      const formValue = this.form.getRawValue() as CreateUser;

      this.store.select(selectUsers).pipe(take(1)).subscribe(users => {
        const isUnique = !users.some(
          user => user.email.toLowerCase() === formValue.email.toLowerCase()
        );

      if (isUnique) {
        const newUser: User = {
          id: Date.now(),
          name: formValue.name,
          email: formValue.email,
          website: formValue.website,
          company: {
            name: formValue.companyName,
          },
        };

      this.store.dispatch(UsersActions.create({ user: newUser }));
      this.dialogRef.close();
      this.snackBar.open('Юзер успешно добавлен', 'ОК',
        { duration: 3000 }
      );
      } else {
      this.snackBar.open('Такой email уже зарегистрирован', 'ОК',
        { duration: 3000 }
      );
      }
    });
   }
  }
}
