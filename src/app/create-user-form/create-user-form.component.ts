import { CommonModule } from "@angular/common";
import { Component, EventEmitter, inject, Output } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { DialogUserComponent } from "./dialog-user/dialog-user.component";
import { MatIconModule } from '@angular/material/icon';

export interface CreateUser {
  name: string;
  email: string;
  website: string;
  companyName: string;
}

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrl: './create-user-form.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatDialogModule, MatIconModule],
})

export class CreateUserFormComponent {
  @Output() createUser = new EventEmitter<CreateUser>();
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogUserComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe((result: CreateUser | undefined) => {
      if (result) {
        this.createUser.emit(result);
      }
    });
  }
}
