import { Injectable } from '@angular/core';
import { DataSource, FindManyOptions } from 'typeorm';
import todoDataSource from '../databases/datasources/TodoDataSource';
import { Todo } from '../databases/entities';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  private connection: DataSource;

  constructor() { 
    this.connection = todoDataSource.dataSource;

  }

  get todoRepository() {
    return this.connection.getRepository(Todo);
  }

  async getTodos(id?: number) {
    let query: FindManyOptions = {};
    if(id) query.where = {
      id
    }
    const todos = await this.todoRepository.find(query);
    console.log("All todos ", todos)
    return todos;
  }

  async addTodo(todo: Partial<Todo>) {
    const newTodo = new Todo();

    newTodo.title = todo.title || '';
    newTodo.completed = false;

    const res = await this.todoRepository.save(newTodo);
    return res;
  }
}
