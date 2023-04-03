import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation.delete.dialog',
  templateUrl: './confirmation.delete.dialog.component.html',
  styleUrls: ['./confirmation.delete.dialog.component.css']
})
export class ConfirmationDeleteDialogComponent {

  message: string = "Você tem certeza que deseja deletar?"
  confirmButtonText = "Sim"
  cancelButtonText = "Não"
  
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationDeleteDialogComponent>) {
      if(data){
    this.message = data.message || this.message;
    if (data.buttonText) {
      this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
      this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
    }
      }
  }
  
  close(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
