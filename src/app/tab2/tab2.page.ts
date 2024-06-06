import { Component } from '@angular/core';
import { TodoService } from '../services/todo-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  form: FormGroup;
  constructor(private fb: FormBuilder, private todoService: TodoService) {
    this.form = this.fb.group({
      title: [''],
      completed: ['']
    })
  }

  async saveTodo() {
    try {

      const res = await this.todoService.addTodo(this.form.value)
      console.log(res);
    } catch(e) {
      console.log("Something went wrong while adding todo ", e)
    }
  }

}
