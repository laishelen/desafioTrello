import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Board } from '../models/board';
import { MensagemErro } from '../models/mensagemerro';
import { TaskList } from '../models/taskList';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private urlBoards = 'http://localhost:3000/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient) { }

  saveBoard(newBoard:Board):Observable<MensagemErro>{
    return this.http.post<MensagemErro>(this.urlBoards+'quadros', newBoard, this.httpOptions);
  }

  deleteBoard(id:number):Observable<MensagemErro>{
    return this.http.delete<MensagemErro>(this.urlBoards+'quadros/'+id);
  }  

  getBoards():Observable<Board[]>{
    return this.http.get<Board[]>(this.urlBoards+'quadros');
  }

  getBoard(board_id:number):Observable<Board[]>{
    return this.http.get<Board[]>(this.urlBoards+'quadros?id='+board_id);
  }

  //TASK LIST

  saveTaskList(newTaskList:TaskList):Observable<MensagemErro>{
    return this.http.post<MensagemErro>(this.urlBoards+'listastarefas', newTaskList, this.httpOptions);
  }

  getTaskLists(board_id:number):Observable<TaskList[]>{
    return this.http.get<TaskList[]>(this.urlBoards+'listastarefas?quadrosId='+board_id);

  }

  deleteTaskList(taskList_id:number):Observable<MensagemErro>{
    return this.http.delete<MensagemErro>(this.urlBoards+'listastarefas/'+taskList_id);
  }

  //TASKS

  getAllTasks(current_list:number):Observable<Task[]>{
    return this.http.get<Task[]>(this.urlBoards+'tarefas?listastarefasId='+current_list);
  }
  saveTask(newTask:Task):Observable<MensagemErro>{
    return this.http.post<MensagemErro>(this.urlBoards+'tarefas', newTask, this.httpOptions);
  }

  updateTask(task:Task):Observable<MensagemErro>{
    return this.http.patch<MensagemErro>(this.urlBoards+'tarefas/'+task.id, task, this.httpOptions);
  }

  moveTask(task_id:number, new_list:number):Observable<MensagemErro>{
    var string_json = '{ "listastarefasId": "'+new_list+'"}';
    return this.http.patch<MensagemErro>(this.urlBoards+'tarefas/'+task_id, string_json, this.httpOptions);
  }
  
  getTasks(taskListId:number):Observable<Task[]>{
    return this.http.get<Task[]>(this.urlBoards+'tarefas?listastarefasId='+taskListId);
  }

  deleteTask(task_id:number):Observable<MensagemErro>{
    return this.http.delete<MensagemErro>(this.urlBoards+'tarefas/'+task_id);
  }
}
