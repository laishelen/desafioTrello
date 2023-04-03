import { Component, Input } from '@angular/core';
import { MensagemErro } from 'src/app/models/mensagemerro';
import { Task } from 'src/app/models/task';
import { TaskList } from 'src/app/models/taskList';
import { TaskService } from 'src/app/services/task.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  successfulDrop = new Event('successfulDrop');

  showAddTask:boolean = false;
  taskList:Task[] =[];
  newTask:Task = {id: 0, titulo: '', descricao:'', listastarefasId: 0};
  list:TaskList = {id: 0, titulo: '', quadrosId: 0, tasks: []};
  @Input() listDetails:TaskList = {id: 0, titulo: '', quadrosId: 0, tasks: []};

  displayedColumns: string[] = ['task'];
 
  MensagemErro: MensagemErro={
    ErrorCode:0,
    ErrorMessage:''
  }  

  constructor(private taskService: TaskService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void { 
    this.getTasks();
  }     

  getTasks() {
    this.taskService.getTasks(this.listDetails.id)
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
      this.taskService.saveTask(this.newTask)
      .subscribe(MensagemErro => {
        this.MensagemErro = MensagemErro;
        this.taskService.getTasks(this.listDetails.id)
            .subscribe(data => this.taskList = data);
      });
      this.newTask.titulo = '';
      this.showAddTask = false;
      
        this._snackBar.open('Tarefa criada com sucesso.', 'OK', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2500,    
          panelClass: ['custom-style']})
    }
  }
}

