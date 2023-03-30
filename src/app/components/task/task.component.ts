import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MensagemErro } from 'src/app/models/mensagemerro';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from './edit.task.dialog/edit.task.dialog.component';
import { ConfirmationDeleteTaskDialogComponent } from './confirmation.delete-task.dialog/confirmation.delete-task.dialog.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @Input() taskDetail:Task = {id: 0, titulo: '', descricao:'', listastarefasId: 0};
  @Output() updateParent = new EventEmitter<string>();

  constructor(private taskService: TaskService, 
    private _snackBar: MatSnackBar, 
    private dialog: MatDialog) {}

  MensagemErro: MensagemErro={
    ErrorCode:0,
    ErrorMessage:''
  }       

  deleteTask() {    
    const dialogRef = this.dialog.open(ConfirmationDeleteTaskDialogComponent,{
      data:{
        message: 'Você tem certeza que deseja deletar?',
        buttonText: {
          ok: 'Sim',
          cancel: 'Não'}
      }});
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if(confirmed) {
        this.taskService.deleteTask(this.taskDetail.id)
        .subscribe(MensagemErro => {
          this.MensagemErro = MensagemErro;
          this.updateParent.emit('deleteTask');

            this._snackBar.open('Tarefa removida com sucesso.', 'OK', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,    
              duration: 2500, 
              panelClass: ['custom-style']})
        });     
      } 
    })  
  } 

  openDialog() {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, 
        {data: 
          //passei assim,porque se passar só o taskDetail ele vincula o do modal com o daqui, causando alterações simultaneas.
            { id: this.taskDetail.id,
              titulo: this.taskDetail.titulo,
              descricao: this.taskDetail.descricao,
              listastarefasId: this.taskDetail.listastarefasId
            }
        } );
    dialogRef.afterClosed().subscribe(result => {
      this.taskDetail = result.data;
    });
  }
}

