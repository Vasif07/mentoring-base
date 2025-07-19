import { Component, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from "@angular/material/icon";

interface DeleteUserData {
  userId: number;
  userName: string;
}

@Component ({
    selector: 'app-delete-user-dialog',
    templateUrl: './delete-user-dialog.component.html',
    styleUrl: './delete-user-dialog.component.scss',
    standalone: true,
    imports: [MatIconModule],
})

export class DeleteUserDialogComponent {
  readonly data = inject<DeleteUserData>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<DeleteUserDialogComponent>);
  readonly snackBar = inject(MatSnackBar); 

  confirmDelete(): void {
    this.dialogRef.close(true); 
    this.openSnackBar('Юзер успешно удалён!', 'ОК');
  }
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
