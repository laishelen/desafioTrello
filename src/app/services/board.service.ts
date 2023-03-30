import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Board } from '../models/board';
import { MensagemErro } from '../models/mensagemerro';

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
    const url = `${this.urlBoards}quadros`;
    return this.http.post<MensagemErro>(url,newBoard,this.httpOptions);   
  }

  deleteBoard(id:number):Observable<MensagemErro>{    
    return this.http.delete<MensagemErro>(`${this.urlBoards}quadros/${id}`);    
  }  

  getBoards():Observable<Board[]>{
    return this.http.get<Board[]>(`${this.urlBoards}quadros`);
  }

  getBoard(board_id:number):Observable<Board[]>{    
    return this.http.get<Board[]>(`${this.urlBoards}quadros?id=${board_id}`);
  }    
}
