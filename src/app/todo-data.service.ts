import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { LocalStorage } from 'ngx-store';
import * as _ from "lodash";

import { Todo } from './todo';

@Injectable()
export class TodoDataService {

  @LocalStorage() public todos: Todo[] = [];

  constructor() {

  }

  addTodo(todo: Todo): TodoDataService {
    if (todo.title.trim().length > 0) {
      if (!todo.id) {
        todo.id = this.guid();
      }

      this.todos.push(todo);
    }

    return this;
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }
    return s4() + '-' + s4() + s4();
  }

  deleteTodoById(id: string): TodoDataService {
    console.log('deleteTodoById', id);
    // .filter() is not working to remove elements ... filter is overridden it shoudl work...
    // this.todos = this.todos.filter((todo) => {return todo.id !== id});
    _.forEach(
      _.get(this, 'todos'),
      (v, k) => {
        if (_.get(v, 'id') == id) { this.todos.splice(+k, 1)};
      }
    );
    return this;
  }

  updateTodoById(id: string, values: Object = {}): Todo {
    let todo = this.getTodoById(id);
     if (!todo) {
       return null;
     }
     Object.assign(todo, values);
     return todo;
  }

  getAllTodos(): Todo[] {
    return this.todos;
  }

  // Simulate GET /todos/:id
  getTodoById(id: string): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  // Toggle todo complete
  toggleTodoComplete(todo: Todo) {
    let updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    return updatedTodo;
  }

  markAllCompleted() {
    this.todos.forEach(
      (v) => v.complete = true
    );

    return this.todos;
  }

  markAllUncompleted() {
    this.todos.forEach(
      (v) => v.complete = false
    );

    return this.todos;
  }

  clearCompleted() {
    let delete_ids = [];
    _.map(this.todos,
        (v) => { if (!!v.complete) { delete_ids.push(v.id); } }
    );

    console.log(delete_ids);

    _.map(delete_ids, this.deleteTodoById);

    return this.todos;
  }

  clearAll() {
    // WebStorageService.clear();/
    this.todos = [];
  }

}
