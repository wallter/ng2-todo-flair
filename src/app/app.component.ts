import { Component } from '@angular/core';
import * as _ from "lodash";

import { SpeechRecognitionService } from './speech-recognition.service';
import { TodoDataService } from './todo-data.service';
import { Todo } from './todo';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/css/app.component.css'],
  providers: [
    TodoDataService
  ]
})
export class AppComponent {

  newTodo: Todo = new Todo();
  isListening: Boolean = true;
  speechData: string;
  speechHistory: any[] = [];
  logicHistory: any[] = [];

  constructor(
    private todoDataService: TodoDataService,
    private speechRecognitionService: SpeechRecognitionService
  ) {
    this.speechData = '';
    // this.listen();
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

  markAllCompleted() {
    return this.todoDataService.markAllCompleted();
  }

  markAllUncompleted() {
    return this.todoDataService.markAllUncompleted();
  }

  clearAll() {
    return this.todoDataService.clearAll();
  }

  ngOnDestroy() {
    this.speechRecognitionService.DestroySpeechObject();
  }

  toggleListen() {
    if (!!this.isListening) {
      this.isListening = false;
      this.speechRecognitionService.stop();
    } else {
      this.isListening = true;
      this.listen();
    }

    console.log('toggleListen', this.isListening);
  }

  listen(): void {
    console.log("this.isListening", this.isListening);

    this.speechRecognitionService.record()
      .subscribe(
        // listener
        (value) => {
          if (_.isEmpty(value)) {
            console.log('llllooodash');
          }

          value = value.trim().toLowerCase();

          this.speechData = value;
          var actionType = 'mic';
          var actionTitle = 'Speach';

          if (value.includes('mark all completed') || value.includes('mark all as completed')) {
            this.markAllCompleted()
            actionType = 'directions';
            actionTitle = 'Direction';
          } else if (value.includes('mark all incomplete') || value.includes('mark all uncomplete') || value.includes('mark all as uncomplete')) {
            this.markAllUncompleted()
            actionType = 'directions';
            actionTitle = 'Direction';
          } else if (value.includes('clear all') || value.includes('clean all')) {
            this.clearAll()
            actionType = 'directions';
            actionTitle = 'Direction';
          } else if (this.isListening) {
            this.newTodo.title = value;
            actionType = 'mic';
          }

          console.log('actionTitle', actionTitle);
          console.log('actionType', actionType);

          this.speechHistory.push({
            text: value,
            time: new Date(),
            type: actionType,
            title: actionTitle
          });

          this.isListening = false;
        },
        // error
        (err) => {
          console.log(err);
          if (err.error == "no-speech") {
            console.log("--restatring service--");
            this.listen();
          }
        },
        // completion
        () => {
          console.log("--complete--");
        }
      );
  }
}
