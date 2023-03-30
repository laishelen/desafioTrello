import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Board } from 'src/app/models/board';
import { MensagemErro } from 'src/app/models/mensagemerro';
import { TaskList } from 'src/app/models/taskList';
import { TaskListService } from 'src/app/services/task-list.service';
import { BoardService } from 'src/app/services/board.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new.board.dialog',
  templateUrl: './new.board.dialog.component.html',
  styleUrls: ['./new.board.dialog.component.css']
})
export class NewBoardDialogComponent {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  listBoards:Board[] | undefined;
  
  constructor(
    public dialogRef: MatDialogRef<NewBoardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public board: Board,
    private taskListService: TaskListService,
    private boardService: BoardService, 
    private _snackBar: MatSnackBar
  ) {}

  MensagemErro: MensagemErro={
    ErrorCode:0,
    ErrorMessage:''
  }

  ngOnInit(): void {
    this.getBoards();
  }

  getBoards() {
    this.boardService.getBoards()
    .subscribe(data => {
      this.listBoards = data;
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  saveBoard() {
    this.boardService.saveBoard(this.board)
    .subscribe(MensagemErro => {

      let board:Board = Object.assign(MensagemErro);
      let todo:TaskList = {id:0, titulo: "To Do", quadrosId: board.id, tasks: []};
      this.taskListService.saveTaskList(todo).subscribe(MensagemErro => {
        this.MensagemErro = MensagemErro;
      });

      let doing:TaskList = {id:0, titulo: "Doing", quadrosId: board.id, tasks: []};
      this.taskListService.saveTaskList(doing).subscribe(MensagemErro => {
        this.MensagemErro = MensagemErro;
      });

      let done:TaskList = {id:0, titulo: "Done", quadrosId: board.id, tasks: []};
      this.taskListService.saveTaskList(done).subscribe(MensagemErro => {
        this.MensagemErro = MensagemErro;
      });

      this._snackBar.open('Quadro criado com sucesso.', 'OK', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,  
        duration: 2500, 
        panelClass: ['custom-style']
      });
    })
    this.dialogRef.close();
  }
}



