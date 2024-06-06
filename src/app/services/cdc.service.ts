import { Injectable } from '@angular/core';
import { DataSource } from 'typeorm';
import todoDataSource from '../databases/datasources/TodoDataSource';
import { CDC } from '../databases/entities';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { TodoService } from './todo-service.service';
import sqliteParams from '../databases/sqliteParams';

@Injectable({
  providedIn: 'root'
})
export class CdcService {
  private connection: DataSource;
  constructor(private http: HttpClient, private todo: TodoService) { 
    this.connection = todoDataSource.dataSource;
  }


  async saveTodoDB() {
    //Temporary fix to keep saved data across browser refresh
    if(sqliteParams.platform === 'web') {
      await sqliteParams.connection.saveToStore(todoDataSource.dbName); 
    }
  }
  
  get cdcRepository() {
    return this.connection.getRepository(CDC);
  }

  async getCdcLogs() {
    const logs = await this.cdcRepository.find({
      order: {
        id: 'ASC'
      }
    });
    return logs;
  }

  async removeLog(id: number) {
    const isExists = await this.cdcRepository.findOne({
      where: {
        id
      }
    });

    if(!isExists) throw new Error("Log does not exist")

    await this.cdcRepository.remove(isExists);
    this.saveTodoDB();
    return true;
  }



  async sendInsertData(item: any) {
    await lastValueFrom(this.http.post('https://jsonplaceholder.typicode.com/users/1/todos', item));
  }

  async sendUpdateData(item: any) {
    await lastValueFrom(this.http.put('https://jsonplaceholder.typicode.com/users/1/todos', item));
  }

  async sendDeleteData(item: any) {
   await lastValueFrom(this.http.delete('https://jsonplaceholder.typicode.com/users/1/todos/'+item.id));
  }

  sendMap: any = {
    'INSERT': (item: any) => this.sendInsertData(item),
    'UPDATE': (item: any) => this.sendUpdateData(item),
    'DELETE': (item: any) => this.sendDeleteData(item),
  }

  async synCdcData() {
    console.log("Starting sync")
    const unsentData = await this.getCdcLogs();
    console.log("Logs fetched ", unsentData);
    for(const item of unsentData) {
      console.log(" item ", item)
      const fn = this.sendMap[item.operation_type];
      console.log(fn)
      try {
        await fn(JSON.parse(item.changed_data));
      } catch(e) {
        console.log("Got an error in a request ")
      }
      console.log("Completed")
      await this.removeLog(item.id)
    };
    this.todo.runQuery("DELETE from 'todo'")
    console.log("Sync finished")
  }
}
