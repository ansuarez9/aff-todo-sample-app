import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../model/Todo';



export const SERVER_URL: string = "/api";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(SERVER_URL);
  }

  deleteTodo(id: number): Observable<any> {
    const url = SERVER_URL + '/' + id;
    return this.http.delete<any>(url);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(SERVER_URL, todo)
  }

  editTodo(todo: Todo): Observable<Todo> {
    const url = SERVER_URL + '/' + todo.id;
    return this.http.patch<Todo>(url, todo);
  }
}
