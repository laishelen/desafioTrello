import { Component } from '@angular/core';
import { Board } from 'src/app/models/board';
import { BoardService } from 'src/app/services/board.service';
import { MensagemErro } from 'src/app/models/mensagemerro';
import { TaskList } from 'src/app/models/taskList';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent {

  showAddTaskList = false;
  displayBoard:boolean = false;
  selectedBoard:Board = {id: 0, titulo: '--'};
  newList:TaskList = {id: 0, titulo: '', quadrosId:0};
  listAllTaskList:TaskList[] | undefined;

  noList:number = 0;
  updateCounter:number = 0;
  idListFrom:number=0;
  idListTo:number=0;
  confirmationForRemoval:boolean = false;
  
  MensagemErro: MensagemErro={
    ErrorCode:0,
    ErrorMessage:''
  }  

  constructor(private route:ActivatedRoute, private boardService: BoardService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.selectedBoard.id = params['id']);
    this.getBoard(this.selectedBoard.id);
  }  

  getTaskLists() {
    this.boardService.getTaskLists(this.selectedBoard.id) 
    .subscribe(data => {
      this.displayBoard = true;
      this.listAllTaskList = data;
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
      alert('Preencha o título');
    } else {
      this.newList.quadrosId = this.selectedBoard.id;
      this.boardService.saveTaskList(this.newList)
      .subscribe(MensagemErro => {
        this.MensagemErro = MensagemErro;
        this.boardService.getTaskLists(this.selectedBoard.id)
        .subscribe(data => {
          this.listAllTaskList = data;
          this.newList.titulo = '';
          this.showAddTaskList = false;
            alert('Lista criada com sucesso.');
        });
      });
    }
  }

  confirmRemoval() {
    if(this.idListFrom!=0 && this.idListTo==0 && !this.confirmationForRemoval) {
      this.confirmationForRemoval = confirm('Realmente não quer mover as tasks para nenhuma outra lista? Se prosseguir, elas serão removidas.')
      console.log(this.confirmationForRemoval);
    } else {
      //Se a lista já foi atualizada, permite
      if(this.idListFrom!=0 && this.idListTo!=0) {
        if(this.idListFrom == this.idListTo) {
          alert('Listas não podem ser iguais');
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
        this.boardService.getAllTasks(this.idListFrom)
        .subscribe(data => 
            {                     
              var movableTasks:Task[] = data;
              this.noList = movableTasks.length;
              for(var i =0; i< movableTasks.length; i++) {
                //Solicitando a alteração task por task
                this.boardService.moveTask(movableTasks[i].id, this.idListTo)
                .subscribe(MensagemErro => 
                  {
                    this.updateCounter++;
                    if(this.updateCounter == this.noList) {
                      //Caso todos os elementos tenham sido alterados, deleto a lista
                      this.boardService.deleteTaskList(this.idListFrom)
                        .subscribe(MensagemErro =>
                          {
                            this.MensagemErro = MensagemErro;
                            //Após deletar a lista, atualizo todas as listas e limpo os campos de seleção
                            this.getTaskLists();
                            alert('Lista removida e tarefas movidas com sucesso');
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
        this.boardService.deleteTaskList(this.idListFrom)
        .subscribe(MensagemErro =>
          {
            this.MensagemErro = MensagemErro;
            //Após deletar a lista, atualizo todas as listas e limpo os campos de seleção
            alert('Lista removida e tarefas deletadas com sucesso');
            this.getTaskLists();
            this.idListFrom=0;
            this.idListTo=0;
          });
      }
    }
  }
}

