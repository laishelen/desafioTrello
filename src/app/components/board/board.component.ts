import { Component } from '@angular/core';
import { Board } from 'src/app/models/board';
import { BoardService } from 'src/app/services/board.service';
import { TaskListService } from 'src/app/services/task-list.service';
import { TaskService } from 'src/app/services/task.service';
import { MensagemErro } from 'src/app/models/mensagemerro';
import { TaskList } from 'src/app/models/taskList';
import { ActivatedRoute, Params } from '@angular/router';
import { Task } from 'src/app/models/task';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { RemoveListDialogComponent } from './remove-list.dialog/remove-list.dialog.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  showAddTaskList = false;
  displayBoard:boolean = false;
  selectedBoard:Board = {id: 0, titulo: '--'};
  newList:TaskList = {id: 0, titulo: '', quadrosId: 0, tasks: []};
  taskList:Task[] =[];
  listAllTaskList:TaskList[] | undefined;
  arrayTaskListId:string[] = [];

  displayedColumns: string[] = ['task'];

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
    private route:ActivatedRoute,
    private boardService: BoardService, 
    private taskListService: TaskListService, 
    private taskService: TaskService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.selectedBoard.id = params['id']);
    this.getBoard(this.selectedBoard.id);
  }

  getTaskLists() {
    this.taskListService.getTaskLists(this.selectedBoard.id) 
    .subscribe(data => {
      this.displayBoard = true;
      this.listAllTaskList = data;
      this.arrayTaskListId = this.listAllTaskList.map(obj => obj.id.toString());
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    var taskId = event.item.element.nativeElement.id;
    var newColumnId = event.container.id;
    var oldColumnId = event.previousContainer.id;    
    
    console.log('tarefa: '+taskId+' da lista: ' + oldColumnId + ' pra lista: ' + newColumnId); 
    
    this.taskService.moveTask(taskId,newColumnId)
    .subscribe(MensagemErro => {
      this.MensagemErro = MensagemErro;
      this.getTaskLists();
    });
  }    

  getBoard(id:number) {
    this.boardService.getBoard(id)
    .subscribe(data => {
      this.selectedBoard = data[0];
      this.getTaskLists();
    });
  }

  addList() {
    this.displayBoard = true;
    if(this.newList.titulo === '') {

      this._snackBar.open('Preencha o título.', 'OK', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition, 
        duration: 2500,    
        panelClass: ['custom-style']})

    } else {
      this.newList.quadrosId = this.selectedBoard.id;
      this.taskListService.saveTaskList(this.newList)
      .subscribe(MensagemErro => {
        this.MensagemErro = MensagemErro;
        this.taskListService.getTaskLists(this.selectedBoard.id)
        .subscribe(data => {
          this.listAllTaskList = data;
          this.arrayTaskListId = this.listAllTaskList.map(obj => obj.id.toString());
          this.newList.titulo = '';
          this.showAddTaskList = false;

          this._snackBar.open('Lista criada com sucesso.', 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition, 
            duration: 2500,    
            panelClass: ['custom-style']
            
          });
        });
      });
    }
  }  

  openDialog() {
    const dialogRef = this.dialog.open(RemoveListDialogComponent, { data: this.selectedBoard});
    dialogRef.afterClosed().subscribe (result => {
      this.selectedBoard = result[0];
      this.getTaskLists();
    });
  }
}

