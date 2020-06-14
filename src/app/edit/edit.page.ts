import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DiscodbService } from '../core/discodb.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IDisco } from '../share/interfaces';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  id: string;
  public disco: IDisco;
  discoForm: FormGroup;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private discodbService: DiscodbService,
    public toastController: ToastController) { }

  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.discodbService.getItem(this.id).then(
      (data: IDisco) => {
        this.disco = data;
        this.displayProduct(this.disco);
      });
    this.discoForm = new FormGroup({
      nombre: new FormControl(''),
      image: new FormControl(''),
      numEntradas: new FormControl(''),
      precio: new FormControl(''),
    });
  
  }

  displayProduct(disco: IDisco): void {
    if (this.discoForm) {
      this.discoForm.reset();
    }
    this.disco = disco;

    // Update the data on the form
    this.discoForm.patchValue({
      nombre: this.disco.nombre,
      image: this.disco.image,
      numEntradas: this.disco.numEntradas,
      precio: this.disco.precio
    });
  }

  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Editar Discoteca',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'create',
          text: 'ACEPTAR',
          handler: () => {
            this.editDisco();
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


  editDisco() {
    this.discodbService.remove(this.disco.id);
    this.disco = this.discoForm.value;
    let nextKey = this.disco.nombre.trim();
    this.disco.id = nextKey;
    this.discodbService.setItem(nextKey, this.disco);
    console.warn(this.discoForm.value);
    this.discodbService.remove(this.disco.id);
  }
  async removeRecord(id) {
    const toast = await this.toastController.create({
      header: 'Elimiar disco',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'delete',
          text: 'ACEPTAR',
          handler: () => {
            this.discodbService.remove(id);
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
}
