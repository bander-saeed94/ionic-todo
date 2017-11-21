import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TodoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoProvider {

  private todos = [];
  private archiveTodos = [];
  constructor(public http: HttpClient) {
    console.log('Hello TodoProvider Provider');
  }
  getTodos(){
    return this.todos;
  }
  getArchiveTodos(){
    return this.archiveTodos;
  }
  addTodo(todo){
    this.todos.push(todo);
  }
  editTodo(todo,index){
    this.todos[index] = todo;
  }
  archiveTodo(index){
    let toBeAchiveTodo = this.todos[index];
    this.todos.splice(index,1);
    this.archiveTodos.push(toBeAchiveTodo);
  }
}
