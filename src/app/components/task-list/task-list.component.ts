import { Component, Input } from '@angular/core';
import { MensagemErro } from 'src/app/models/mensagemerro';
import { Task } from 'src/app/models/task';
import { TaskList } from 'src/app/models/taskList';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  
  successfulDrop = new Event('successfulDrop');

  showAddTask:boolean = false;
  taskList:Task[] =[];
  newTask:Task = {id: 0, titulo: '', descricao:'', listastarefasId: 0};
  @Input() listDetails:TaskList = {id: 0, titulo: '', quadrosId: 0};
 
  MensagemErro: MensagemErro={
    ErrorCode:0,
    ErrorMessage:''
  }  

  constructor(private boardService: BoardService) { }

  ngOnInit(): void { 
    this.getTasks();
  }

  getTasks() {
    this.boardService.getTasks(this.listDetails.id)
    .subscribe(data => this.taskList = data);
  }

  cancelTask() {
    this.showAddTask = false;
  }

  saveTask() {
    if(this.newTask.titulo === '') {
      this.showAddTask = false;
    } else {
      this.newTask.listastarefasId = this.listDetails.id;
      this.boardService.saveTask(this.newTask)
      .subscribe(MensagemErro => {
        this.MensagemErro = MensagemErro;
        this.boardService.getTasks(this.listDetails.id)
            .subscribe(data => this.taskList = data);
      });
      this.newTask.titulo = '';
      this.showAddTask = false;
        alert('Tarefa criada com sucesso.');
    }
  }

  drag(ev:any) {
    ev.dataTransfer.setData("text", ev.target.id);
    addEventListener('successfulDrop',(ev => {this.getTasks(); }));
  }

  allowDrop(ev:any) {
    ev.preventDefault();
  }

  drop(ev:any) {
    ev.preventDefault();

    var data = ev.dataTransfer.getData("text");
    
    this.boardService.moveTask(data,this.listDetails.id)
    .subscribe(MensagemErro => {
      this.MensagemErro = MensagemErro;
      this.boardService.getTasks(this.listDetails.id)
      .subscribe(data => {
        this.taskList = data;
        dispatchEvent(this.successfulDrop);
        }
      );
    });
  }
}

