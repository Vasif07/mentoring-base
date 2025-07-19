import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { User } from "../users-list.component";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";
import { DeleteUserDialogComponent } from "../delete-user-dialog/delete-user-dialog.component";
import { EditUser } from '../edit-user-dialog/edit-user-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss'],
    standalone: true,
    imports: [MatIconModule],
})

export class UserCardComponent {
  @Input() user!: User;

  @Output() deleteUser = new EventEmitter<number>();

  @Output() editUser = new EventEmitter<User>();

  readonly dialog: MatDialog = inject(MatDialog);

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      data: { userId: this.user.id, userName: this.user.name },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean | undefined) => {
      if (confirmed) {
        this.deleteUser.emit(this.user.id);
      }
    });
  }

  openEditDialog(): void {
    const editUser: EditUser = {
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      website: this.user.website,
      companyName: this.user.company.name,
    };

    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { user: editUser },
    });

    dialogRef.afterClosed().subscribe((editResult: User | undefined) => {
      if (editResult) {
      this.editUser.emit(editResult);
      }
    });

 }
}
