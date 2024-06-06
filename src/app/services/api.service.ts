import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoService } from './todo-service.service';
import { from, map } from 'rxjs';
import { Todo } from '../databases/entities';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private todoService: TodoService) { }

  get isOnline() {
    return !navigator.onLine;
  }

  getTodos() {
    return this.http.get('https://jsonplaceholder.typicode.com/users/1/todos')
  }

  getLocalTodos() {
    return from(this.todoService.getTodos());
  }

  saveTodo(todo: {  title: string, completed: boolean }) {
    if(this.isOnline) {
      return this.http.post('https://jsonplaceholder.typicode.com/users/1/todos', todo).pipe(map((res) => ({ message: "Todo saved remotely", data:res })))
    } 

    console.log("Device offline")
    return from(this.todoService.addTodo(todo)).pipe(map((res) => ({ message: "Todo saved locally", data:res })));
  }

  async deleteTodo(id: number) {
     from(this.todoService.deleteTodo(id));
    // await this.fetchTodos();
  }


}
