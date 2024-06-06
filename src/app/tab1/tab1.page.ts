import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo-service.service';
import { Todo } from '../databases/entities';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private todoService: TodoService) {}

  todos!: Todo[];
  async ionViewDidEnter() {
    await this.fetchTodos();
  }

  async fetchTodos() {
    this.todos = await this.todoService.getTodos();
  }

  async delete(id: number) {
    await this.todoService.deleteTodo(id);
    await this.fetchTodos();
  }

}
