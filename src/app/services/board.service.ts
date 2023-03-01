import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Board } from '../models/board';
import { catchError } from 'rxjs/operators';
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
    return this.http.post<MensagemErro>(this.urlBoards+'quadros', newBoard, this.httpOptions).pipe(
      catchError(this.handleError<MensagemErro>('saveBoard'))
    );
  }

  deleteBoard(id:number):Observable<MensagemErro>{
    return this.http.delete<MensagemErro>(this.urlBoards+'quadros/'+id).pipe(
      catchError(this.handleError<MensagemErro>('deleteBoard'))
    );
  }  

  getBoards():Observable<Board[]>{
    return this.http.get<Board[]>(this.urlBoards+'quadros')
    .pipe(
        catchError(this.handleError<Board[]>('getBoards'))
    );
  }

  getBoard(board_id:number):Observable<Board[]>{
    return this.http.get<Board[]>(this.urlBoards+'quadros?id='+board_id)
    .pipe(
        catchError(this.handleError<Board[]>('getBoard'))
    );
  }

  //TASK LIST

  saveTaskList(newTaskList:TaskList):Observable<MensagemErro>{
    return this.http.post<MensagemErro>(this.urlBoards+'listastarefas', newTaskList, this.httpOptions).pipe(
      catchError(this.handleError<MensagemErro>('saveTaskList'))
    );
  }

  getTaskLists(board_id:number):Observable<TaskList[]>{
    return this.http.get<TaskList[]>(this.urlBoards+'listastarefas?quadrosId='+board_id)
    .pipe(
        catchError(this.handleError<TaskList[]>('getTaskLists'))
    );
  }

  deleteTaskList(taskList_id:number):Observable<MensagemErro>{
    return this.http.delete<MensagemErro>(this.urlBoards+'listastarefas/'+taskList_id).pipe(
      catchError(this.handleError<MensagemErro>('deleteTaskList'))
    );
  }

  //TASKS

  getAllTasks(current_list:number):Observable<Task[]>{
    return this.http.get<Task[]>(this.urlBoards+'tarefas?listastarefasId='+current_list).pipe(
      catchError(this.handleError<Task[]>('getAllTasks'))
    );
  }
  saveTask(newTask:Task):Observable<MensagemErro>{
    return this.http.post<MensagemErro>(this.urlBoards+'tarefas', newTask, this.httpOptions).pipe(
      catchError(this.handleError<MensagemErro>('saveTask'))
    );
  }

  updateTask(task:Task):Observable<MensagemErro>{
    return this.http.patch<MensagemErro>(this.urlBoards+'tarefas/'+task.id, task, this.httpOptions).pipe(
      catchError(this.handleError<MensagemErro>('updateTask'))
    );
  }

  moveTask(task_id:number, new_list:number):Observable<MensagemErro>{
    var string_json = '{ "listastarefasId": "'+new_list+'"}';
    return this.http.patch<MensagemErro>(this.urlBoards+'tarefas/'+task_id, string_json, this.httpOptions).pipe(
      catchError(this.handleError<MensagemErro>('moveTask'))
    );
  }
  
  getTasks(taskListId:number):Observable<Task[]>{
    return this.http.get<Task[]>(this.urlBoards+'tarefas?listastarefasId='+taskListId)
    .pipe(
      catchError(this.handleError<Task[]>('getTasks'))
    );
  }

  deleteTask(task_id:number):Observable<MensagemErro>{
    return this.http.delete<MensagemErro>(this.urlBoards+'tarefas/'+task_id).pipe(
      catchError(this.handleError<MensagemErro>('deleteTask'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        console.error(error);
        return of(result as T);
    };
  }
}
