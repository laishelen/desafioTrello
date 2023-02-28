import { Component } from '@angular/core';
import { Board } from 'src/app/models/board';
import { BoardService } from 'src/app/services/board.service';
import { MensagemErro } from 'src/app/models/mensagemerro';
import { Router } from '@angular/router';
import { TaskList } from 'src/app/models/taskList';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  listBoards:Board[] | undefined;
  displayBoard = false;
  selectedBoard:Board = {id: 0, titulo: '--'};
  board:Board = {id: 0, titulo: ''};

  MensagemErro: MensagemErro={
    ErrorCode:0,
    ErrorMessage:''
  }

  constructor(private boardService: BoardService, private router: Router) { }

  ngOnInit(): void {
    this.getBoards();
  }

  saveBoard() {
    this.boardService.saveBoard(this.board)
    .subscribe(MensagemErro => {

        this.MensagemErro = MensagemErro;

        var board:Board = Object.assign(MensagemErro);
        var todo:TaskList = {id:0, titulo: "To Do", quadrosId: board.id};

        this.boardService.saveTaskList(todo).subscribe(MensagemErro => {
          this.MensagemErro = MensagemErro;
        });

        var doing:TaskList = {id:0, titulo: "Doing", quadrosId: board.id};
        this.boardService.saveTaskList(doing).subscribe(MensagemErro => {
          this.MensagemErro = MensagemErro;
        });

        var done:TaskList = {id:0, titulo: "Done", quadrosId: board.id};
        this.boardService.saveTaskList(done).subscribe(MensagemErro => {
          this.MensagemErro = MensagemErro;
        });

        this.getBoards();
    });
  }

  deleteBoard(id:number) {
    let confirmation = confirm('Deletar este quadro irá remover todas as listas e tarefas existentes. Deseja prosseguir?');
    if(confirmation) {
      this.boardService.deleteBoard(id)
      .subscribe(MensagemErro => {
        this.MensagemErro = MensagemErro;
        this.getBoards()
        alert('Quadro removido com sucesso.');
      });
    }    
  }

  selectBoard(selectedBoard:Board) {
    if(selectedBoard.id>0) {
      /*this.boardService.getTaskLists(selectedBoard.id)
      .subscribe(data => boar.listAllTaskList = data);*/
      this.selectedBoard = selectedBoard;
      this.router.navigate(['/board', selectedBoard.id ]);
    }
  }

  getBoards() {
    this.boardService.getBoards()
    .subscribe(data => {
                          this.listBoards = data;
                          //this.listBoards.unshift(this.selectedBoard)
                        });
  }
}
