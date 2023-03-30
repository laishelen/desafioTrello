import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MensagemErro } from '../models/mensagemerro';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private urlBoards = 'http://localhost:3000/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient) { }

  getAllTasks(current_list:number):Observable<Task[]>{
    return this.http.get<Task[]>(`${this.urlBoards}tarefas?listastarefasId=${current_list}`);
  }
  
  saveTask(newTask:Task):Observable<MensagemErro>{    
    const url = `${this.urlBoards}tarefas`;
    return this.http.post<MensagemErro>(url,newTask, this.httpOptions);
  }

  updateTask(task:Task):Observable<MensagemErro>{    
    const url = `${this.urlBoards}tarefas/${task.id}`;
    return this.http.patch<MensagemErro>(url,task, this.httpOptions);
  }

  moveTask(task_id:string, new_list:string):Observable<MensagemErro>{
    const string_json = '{ "listastarefasId": "'+new_list+'"}';
    const url = `${this.urlBoards}tarefas/${task_id}`;    
    return this.http.patch<MensagemErro>(url,string_json, this.httpOptions);
  }
  
  getTasks(taskListId:number):Observable<Task[]>{
    return this.http.get<Task[]>(`${this.urlBoards}tarefas?listastarefasId=${taskListId}`);
  }

  deleteTask(task_id:number):Observable<MensagemErro>{
    return this.http.delete<MensagemErro>(`${this.urlBoards}tarefas/${task_id}`);
  }
}
