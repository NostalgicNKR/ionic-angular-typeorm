import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo-service.service';
import { Todo } from '../databases/entities';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  activeSegment = 'local';

  constructor(private router: Router, private api: ApiService) {}

  setActiveSegment(event: any) {
    this.activeSegment = event.detail.value;
  }

  localTodos!: Todo[];
  remoteTodos!: Todo[];

  ionViewDidEnter() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.api.getTodos().subscribe((res: any) => {
      this.remoteTodos = res;
    })
    this.api.getLocalTodos().subscribe((res) => {
      this.localTodos = res;
    });
  }

  delete(id: number) {
    this.api.deleteTodo(id);
  }

  edit(id: number) {
    this.router.navigate(['/tabs/tab2'], { queryParams: { id } });
  }

}
