import { Component, Inject } from '@angular/core';
import { MensagemErro } from 'src/app/models/mensagemerro';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';
import { TaskListService } from 'src/app/services/task-list.service';
import { Board } from 'src/app/models/board';
import { TaskList } from 'src/app/models/taskList';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-remove-list.dialog',
  templateUrl: './remove-list.dialog.component.html',
  styleUrls: ['./remove-list.dialog.component.css']
})
export class RemoveListDialogComponent {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  selectedBoard:Board = {id: 0, titulo: '--'};
  displayBoard:boolean = false;
  listAllTaskList:TaskList[] | undefined;
  arrayTaskListId:string[] = [];

  noList:number = 0;
  updateCounter:number = 0;
  idListFrom:number=0;
  idListTo:number=0;
  confirmationForRemoval:boolean = false;
  
  MensagemErro: MensagemErro={
    ErrorCode:0,
    ErrorMessage:''
  }

  constructor(
    public dialogRef: MatDialogRef<RemoveListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public board: Board,
    private taskService: TaskService,
    private taskListService: TaskListService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getTaskLists();
  }

  getTaskLists() {
    this.taskListService.getTaskLists(this.board.id) 
    .subscribe(data => {
      this.displayBoard = true;
      this.listAllTaskList = data;
      this.arrayTaskListId = this.listAllTaskList.map(obj => obj.id.toString());
    });
  }

  confirmRemoval() {
    if(this.idListFrom!=0 && this.idListTo==0 && !this.confirmationForRemoval) {
      this.confirmationForRemoval = confirm('Realmente não quer mover as tasks para nenhuma outra lista? Se prosseguir, elas serão removidas.')
      console.log(this.confirmationForRemoval);
    } else {
      //Se a lista já foi atualizada, permite
      if(this.idListFrom!=0 && this.idListTo!=0) {
        if(this.idListFrom == this.idListTo) {

          this._snackBar.open('Listas não podem ser iguais.', 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition, 
            duration: 2500,    
            panelClass: ['custom-style']})

        } else {
          this.confirmationForRemoval = true;
        }
      }
    }
  }

  removeTask() {    
    if(this.idListFrom!=0 && this.confirmationForRemoval) {
      if(this.idListTo != 0) {
        //Caso tenhamos que mover, busco todas as atividades da lista em questão
        this.taskService.getAllTasks(this.idListFrom)
        .subscribe(data => 
            {                     
              var movableTasks:Task[] = data;
              this.noList = movableTasks.length;
              for(var i =0; i< movableTasks.length; i++) {
                //Solicitando a alteração task por task
                this.taskService.moveTask(movableTasks[i].id.toString(), this.idListTo.toString())
                .subscribe(MensagemErro => 
                  {
                    this.updateCounter++;
                    if(this.updateCounter == this.noList) {
                      //Caso todos os elementos tenham sido alterados, deleto a lista
                      this.taskListService.deleteTaskList(this.idListFrom)
                        .subscribe(MensagemErro =>
                          {
                            this.MensagemErro = MensagemErro;
                            //Após deletar a lista, atualizo todas as listas e limpo os campos de seleção
                            this.getTaskLists();

                            this._snackBar.open('Lista removida e tarefas movidas com sucesso.', 'OK', {
                              horizontalPosition: this.horizontalPosition,
                              verticalPosition: this.verticalPosition, 
                              duration: 2500,    
                              panelClass: ['custom-style']})

                            this.updateCounter=0;
                            this.idListFrom=0;
                            this.idListTo=0;
                          });
                    }
                    this.MensagemErro = MensagemErro;
                  });
                }
              });
      } else {
        //Caso só seja preciso deletar, sem mover
        this.taskListService.deleteTaskList(this.idListFrom)
        .subscribe(MensagemErro =>
          {
            this.MensagemErro = MensagemErro;
            //Após deletar a lista, atualizo todas as listas e limpo os campos de seleção

            this._snackBar.open('Lista removida e tarefas deletadas com sucesso.', 'OK', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition, 
              duration: 2500,    
              panelClass: ['custom-style']})
              
            this.getTaskLists();
            this.idListFrom=0;
            this.idListTo=0;
          }
        );
        this.cleanLists;
        this.close();
      }        
    }    
  }

  cleanLists() {
    this.idListFrom=0;
    this.idListTo=0;
  }

  close(): void {
    this.dialogRef.close();
  }
}
