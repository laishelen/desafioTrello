import { Component, Input, Inject, Output, EventEmitter } from '@angular/core';
import { MensagemErro } from 'src/app/models/mensagemerro';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit.task.dialog',
  templateUrl: './edit.task.dialog.component.html',
  styleUrls: ['./edit.task.dialog.component.css']
})
export class EditTaskDialogComponent {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    public dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public task:Task,
    private taskService: TaskService, 
    private _snackBar: MatSnackBar) {}

  MensagemErro: MensagemErro={
    ErrorCode:0,
    ErrorMessage:''
  }

  close(): void {
    this.dialogRef.close();
  }

  updateTask() {
    this.taskService.updateTask(this.task)
    .subscribe(MensagemErro => {
      this.MensagemErro = MensagemErro;
      
      this.dialogRef.close({ data: this.task });
      this._snackBar.open('Tarefa editada com sucesso.', 'OK', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,  
        duration: 2500,   
        panelClass: ['custom-style']})
    })
  }    
}
