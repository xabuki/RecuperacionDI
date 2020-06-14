import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { discocrudService } from '../core/discocrud.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IDisco } from '../share/interfaces';


@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  disco: IDisco;
  discoForm: FormGroup;
  discoNombre: string;
  discoImage:string;
  discoNumEntradas:number;
  discoPrecio:number;

  constructor(private router: Router,
    private discocrud: discocrudService,
    public toastController: ToastController) { }

  ngOnInit() {
    this.discoForm = new FormGroup({
      nombre: new FormControl(''),
      image: new FormControl(''),
      numEntradas: new FormControl(''),
      precio: new FormControl(''),
    });
  }
  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Guardar Discoteca',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.saveDisco();
            this.router.navigate(['home']);
          }
        }, {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
  saveDisco() {
    this.disco = this.discoForm.value;
    let record = {};
    record['nombre'] = this.disco.nombre;
    record['numEntradas'] = this.disco.numEntradas;
    record['image'] = this.disco.image;
    record['precio'] = this.disco.precio;
    this.discocrud.create_disco(record).then(resp => {
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }
}


