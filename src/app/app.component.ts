import { Component } from '@angular/core';
// Import class so we can use it as dependency injection token in the constructor
import {TodoDataService} from './todo-data.service';
import {Todo} from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/app.component.css'],
  /*
    The AppComponent‘s dependency injector will now recognize the TodoDataService
    class as a dependency injection token and return a single instance of
    TodoDataService when we ask for it.
   */
  providers: [TodoDataService]
  // Service is now available in AppComponent as this.todoDataService
})
export class AppComponent {
  // We first define a newTodo property and assign a new Todo() when the
  //   component class is instantiated. This is the same Todo instance specified
  //   in the two-way binding expression of [(ngModel)] in the view
  newTodo: Todo = new Todo();
  // Ask Angular DI system to inject the dependency
  // associated with the dependency injection token `TodoDataService`
  // and assign it to a property called `todoDataService`
  //
  // "private todoDataService: TodoDataService" is short hand for
  //   creating this.todoDataService
  constructor(private todoDataService: TodoDataService) {
  }

  addTodo() {
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo);
  }

  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id);
  }

  get todos() {
    return this.todoDataService.getAllTodos();
  }
}
