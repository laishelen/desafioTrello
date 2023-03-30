import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation.delete-task.dialog',
  templateUrl: './confirmation.delete-task.dialog.component.html',
  styleUrls: ['./confirmation.delete-task.dialog.component.css']
})
export class ConfirmationDeleteTaskDialogComponent {

  message: string = "Você tem certeza?"
  confirmButtonText = "Sim"
  cancelButtonText = "Cancel"
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationDeleteTaskDialogComponent>) {
      if(data){
    this.message = data.message || this.message;
    if (data.buttonText) {
      this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
      this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
    }
      }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}



