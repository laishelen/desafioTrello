import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskList } from '../models/taskList';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MensagemErro } from '../models/mensagemerro';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  private urlBoards = 'http://localhost:3000/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient) { }

  saveTaskList(newTaskList:TaskList):Observable<MensagemErro>{    
    const url = `${this.urlBoards}listastarefas`;
    return this.http.post<MensagemErro>(url,newTaskList,this.httpOptions);
  }

  getTaskLists(board_id:number):Observable<TaskList[]>{
    return this.http.get<TaskList[]>(`${this.urlBoards}listastarefas?quadrosId=${board_id}`);
  }

  deleteTaskList(taskList_id:number):Observable<MensagemErro>{    
    return this.http.delete<MensagemErro>(`${this.urlBoards}listastarefas/${taskList_id}`);
  }
}
