import { Injectable } from '@angular/core';
import { DataSource, FindManyOptions } from 'typeorm';
import todoDataSource from '../databases/datasources/TodoDataSource';
import { Todo } from '../databases/entities';
import sqliteParams from '../databases/sqliteParams';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private connection: DataSource;

  constructor() { 
    this.connection = todoDataSource.dataSource;

  }

  
  async runQuery(query: string): Promise<any> {
    if (!this.connection.createQueryRunner()) {
      throw new Error('QueryRunner not initialized');
    }
    return this.connection.createQueryRunner().query(query);
  }

  get todoRepository() {
    return this.connection.getRepository(Todo);
  }

  async saveInventoryDb() {
    //Temporary fix to keep saved data across browser refresh
    if(sqliteParams.platform === 'web') {
      await sqliteParams.connection.saveToStore(todoDataSource.dbName); 
    }
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
    newTodo.completed = todo.completed || false;

    const res = await this.todoRepository.save(newTodo);
    await this.saveInventoryDb();
    return res;
  }

  async updateTodo(id: number, todo: Partial<Todo>) {
    const isExists = await this.todoRepository.findOne({
      where: {
        id
      }
    });

    if(!isExists) throw "Todo not found";

    const update = await this.todoRepository.update(id, {
      title: todo.title,
      completed: todo.completed
    });
    console.log(update);
    return update;
  }

  async deleteTodo(id: number) {

    const todoToRemove = await this.todoRepository.findOne({
      where: {
        id
      }
    });
    if (!todoToRemove) {
        throw new Error(`Todo with ID ${id} not found`);
    }

    const res = await this.todoRepository.remove(todoToRemove)
    console.log(res);
    return res;
  }
}
