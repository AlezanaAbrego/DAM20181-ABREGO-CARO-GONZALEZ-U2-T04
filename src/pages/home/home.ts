import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todos: any = [];

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public storage: Storage) {

  }

  ionViewDidEnter() {
    this.storage.get('todos').then((todos) => {
      if (!todos) return;
      this.todos = todos;
    });
  }


  add() {
    let alert = this.alertCtrl.create({
      title: 'Nueva Tarea',
      message: '¿Qué deseas hacer?',
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre'
        },
        {
          name: 'fecha',
          type: 'date'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: (todo: any) => {
            this.todos.push({ nombre: todo.nombre, fecha: todo.fecha, hecho: false });
            this.storage.set('todos', this.todos);
          }
        }
      ]
    });
    alert.present();
  }


  save(todo) {
    this.storage.set('todos', this.todos);
  }


}