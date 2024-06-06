import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo-service.service';
import { CdcService } from '../services/cdc.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  isSyncProgress: boolean = false;
  data: any[] = [];

  constructor(private todoService: TodoService, private cdc: CdcService) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.data = await this.todoService.runQuery('SELECT * FROM cdc');
  }

  async startSync() {
    this.isSyncProgress = true;
    try {
      await this.cdc.synCdcData();
      this.isSyncProgress = false;
    } catch(e) {
      this.isSyncProgress = false;
    }
  }

}
