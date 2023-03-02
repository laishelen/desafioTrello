import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MensagemErro } from 'src/app/models/mensagemerro';
import { Task } from 'src/app/models/task';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  @Input() taskDetail:Task = {id: 0, titulo: '', descricao:'', listastarefasId: 0};
  @Output() updateParent = new EventEmitter<string>();
  showDesc:boolean = false;

  constructor(private boardService: BoardService) {}

  MensagemErro: MensagemErro={
    ErrorCode:0,
    ErrorMessage:''
  }  

  updateTask() {
    this.boardService.updateTask(this.taskDetail)
    .subscribe(MensagemErro => {
      this.MensagemErro = MensagemErro;
      this.updateParent.emit('updateTask')
        alert('Tarefa editada com sucesso.');   
    })
  }     

  deleteTask() {
    let confirmation = confirm('Tem certeza que deseja deletar essa tarefa?');
    if(confirmation) {
      this.boardService.deleteTask(this.taskDetail.id)
      .subscribe(MensagemErro => {
        this.MensagemErro = MensagemErro;
        this.updateParent.emit('deleteTask');
          alert('Tarefa removida com sucesso.');
      });
    }  
  }    
}

