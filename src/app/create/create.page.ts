import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DiscodbService } from '../core/discodb.service';
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

  constructor(private router: Router,
    private discodbService: DiscodbService,
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
    let nextKey = this.disco.nombre.trim();
    this.disco.id = nextKey;
    this.discodbService.setItem(nextKey, this.disco);
    console.warn(this.discoForm.value);
  }
}


