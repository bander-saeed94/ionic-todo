import { Component } from '@angular/core';
import { NavController, AlertController, ToastController , reorderArray } from 'ionic-angular';
import { TodoProvider } from '../../providers/todo/todo'
import { ArchiveTodosPage } from '../../pages/archive-todos/archive-todos';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public todos = [];
  public reorderIsEnabled = false;
  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private todoProvider: TodoProvider,
    public navCtrl: NavController) {

        this.todos = this.todoProvider.getTodos();
  }

  goToArchivePage(){
    this.navCtrl.push(ArchiveTodosPage);
  }
  openEditAlert(index){
    let editTodoAlert = this.alertController.create({
      title: "Edit TODO",
      message: "Edit your todo",
      inputs: [
        {
          type: "text",
          name: "todoInput",
          value: this.todos[index]
        }
      ],
      buttons:[
        {
          text: "Cancel"
        },
        {
          text: "Edit",
          handler:(InputDate)=>{
            let editedTodo = InputDate.todoInput;
            this.todoProvider.editTodo(editedTodo,index);
            editTodoAlert.onDidDismiss(()=>{
              let editedTomast = this.toastController.create({
                message: "todo edited",
                duration: 2000
              })
              editedTomast.present();
            });
          }
        }
      ]
    });
    editTodoAlert.present();
  }
  archiveTodo(index){
    this.todoProvider.archiveTodo(index);
  }
  reorderItem($event){
    reorderArray(this.todos,$event);
  }
  openAddTodoAlert() {
    let addTodoAlert = this.alertController.create({
      title: "ADD TODO",
      message: "add your todo",
      inputs: [
        {
          type: "text",
          name: "todoInput"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "add todo",
          handler: (inputData) => {
            let todoData = inputData.todoInput;
            this.todoProvider.addTodo(todoData);
            addTodoAlert.onDidDismiss(()=>{
              let tomastAlert = this.toastController.create({
                message:"todo added",
                duration: 2000
              });
              tomastAlert.present();
            });
          }
        }
      ]
    });
    addTodoAlert.present();
  }
}
