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

  // para remover a lista -> não achei no backend funcao para atualizar vários registros, então fiz um controle 
  noLista:number = 0;
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
  addList(){
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
                        });
            });
      }
  }

  confirmRemoval() {
    if(this.idListFrom!=0 && this.idListTo==0 && !this.confirmationForRemoval) {
      this.confirmationForRemoval = confirm('Realmente não quer mover as tasks para nenhuma outra lista? Se prosseguir, elas serão removidas.');
      console.log(this.confirmationForRemoval);
    }
    //Se a lista já foi atualizada, permite
    if(this.idListFrom!=0 && this.idListTo!=0) {
      this.confirmationForRemoval = true;
    }
  }

  removeTask() {
    //Verifica se todos os critérios foram satisfeitos
    if(this.idListFrom!=0 && this.confirmationForRemoval) {

      /**
       * Como o Backend não possui uma função para atualização em massa
       * fazemos a atualização de cada registro individualmente
       * verificando somente (no callback) se o total de registros foi atualizado
       * Caso sejam todos atualizados, removemos a coluna em questão e atualizamos as listas
       */

      //Condição para verificar se devemos mover ou só deletar
      if(this.idListTo != 0) {
        //Caso tenhamos que mover, busco todas as atividades da lista em questão
        this.boardService.getAllTasks(this.idListFrom)
          .subscribe(data => 
              {
                //No retorno de todas as tarefas da lista, faço um for para cada tarefa solicitando a alteração dela
                var movableTasks:Task[] = data;
                //Salvo a quantidade de tarefas retornadas naquela lista, para futura comparação
                this.noLista = movableTasks.length;

                for(var i =0; i< movableTasks.length; i++) {
                  //Solicitando a alteração task por task
                  this.boardService.moveTask(movableTasks[i].id, this.idListTo)
                    .subscribe(MensagemErro => 
                      {
                        //Para cada retorno de cada tarefa, eu aumento o contador
                        this.updateCounter++;

                        /**
                         * Caso o total do contador (tarefas atualizadas), seja igual à quantidade original da lista
                         * Quer dizer que todas as tarefas já foram atualizadas
                         * Faço isso porque se não, para cada tarefa atualizada ele tentaria deletar a coluna, gerando vários problemas
                         */
                        if(this.updateCounter == this.noLista) {
                          //Caso todos os elementos tenham sido alterados, deleto a lista
                          this.boardService.deleteTaskList(this.idListFrom)
                            .subscribe(MensagemErro =>
                              {
                                this.MensagemErro = MensagemErro;
                                //Após deletar a lista, atualizo todas as listas e limpo os campos de seleção
                                this.getTaskLists();
                                alert('Lista removida e tarefas movidas com sucesso');
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

