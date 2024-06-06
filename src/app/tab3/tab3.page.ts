import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo-service.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  data: any[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.data = await this.todoService.runQuery('SELECT * FROM cdc');
  }

}
