import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  form: FormGroup;
  constructor(private fb: FormBuilder, private todoService: TodoService, private route: ActivatedRoute, private api: ApiService, private toast: ToastService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      completed: ['']
    })
  }

  todoId: any;
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        const id = params['id'];
        this.todoId = id;
        console.log('Query Param ID:', id);
        if(id) {
          this.todoService.getTodos(id).then((res) => {
            console.log(res[0]);
            this.form.patchValue(res[0]);
            console.log(this.form.value)
          })
        }
        // Use the id parameter as needed
    });
  }

  async saveTodo() {
    if(!this.form.valid) return;
    this.api.saveTodo(this.form.value)?.subscribe((res) => {
      console.log(res.message);
      this.toast.presentSuccess(res.message)
    })
    // try {
    //   let res;
    //   if(this.todoId) {
    //    res = await this.todoService.updateTodo(this.todoId, this.form.value);
    //   } else {
    //     res = await this.todoService.addTodo(this.form.value)
    //   }
    //   console.log(res);
    // } catch(e) {
    //   console.log("Something went wrong while adding todo ", e)
    // }
  }

}
