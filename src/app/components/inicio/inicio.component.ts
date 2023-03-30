import { Component } from '@angular/core';
import { Board } from 'src/app/models/board';
import { BoardService } from 'src/app/services/board.service';
import { MensagemErro } from 'src/app/models/mensagemerro';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NewBoardDialogComponent } from './new.board.dialog/new.board.dialog.component';
import { ConfirmationDeleteDialogComponent } from './confirmation.delete.dialog/confirmation.delete.dialog.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

const logoURL = 
"https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent {
  constructor(
    private boardService: BoardService, 
    private router: Router, 
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,) {
        this.matIconRegistry.addSvgIcon(
          "logo",
          this.
          domSanitizer.
          bypassSecurityTrustResourceUrl(logoURL));
    }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  listBoards:Board[] | undefined;
  displayBoard = false;
  selectedBoard:Board = {id: 0, titulo: '--'};
  board:Board = {id: 0, titulo: ''};

  valorDoInput:string = '';
  
  alertaValor(){
    alert(this.valorDoInput);
  }

  MensagemErro: MensagemErro={
    ErrorCode:0,
    ErrorMessage:''
  }

  ngOnInit(): void {
    this.getBoards();
  }

  deleteBoard(id:number) {    
    const dialogRef = this.dialog.open(ConfirmationDeleteDialogComponent,{
    data:{
      message: 'Você tem certeza que deseja deletar?',
      buttonText: {
        ok: 'Sim',
        cancel: 'Não'}
    }});
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.boardService.deleteBoard(id)
          .subscribe(MensagemErro => {
            this.MensagemErro = MensagemErro;
            this.getBoards()

            this._snackBar.open('Quadro deletado com sucesso.', 'OK', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition, 
              duration: 2500,    
              panelClass: ['custom-style']
            });
          });
      }
    });
  }  

  selectBoard(selectedBoard:Board) {
    if(selectedBoard.id>0) {
      this.selectedBoard = selectedBoard;
      this.router.navigate(['/board', selectedBoard.id ]);
    }
  }

  getBoards() {
    this.boardService.getBoards()
    .subscribe(data => { this.listBoards = data; });
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewBoardDialogComponent, {data: {board: this.board}} );
    dialogRef.afterClosed().subscribe(result => {
      this.board = result;
      this.getBoards();
    });
  }
}

