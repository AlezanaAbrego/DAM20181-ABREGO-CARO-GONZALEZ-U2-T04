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

update(todo, i) {
    let alert = this.alertCtrl.create({
      title: 'Modificar Tarea',
      message: '¿Qué deseas hacer?',
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre',
          value: todo.nombre
        },
        {
          name: 'fecha',
          type: 'date',
          value: todo.fecha
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: (data: any) => {
            this.todos[i] = { nombre: data.nombre, fecha: data.fecha, hecho: todo.hecho };
            this.save(todo);
          }
        }
      ]
    });
    alert.present();
  }

  delete(todo, i) {
    let alert = this.alertCtrl.create({
      title: 'Eliminar Tarea',
      message: ¿Seguro que deseas eliminar ${todo.nombre}?,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.todos.splice(i, 1);
            this.save(todo);
          }
        }
      ]
    });
    alert.present();
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