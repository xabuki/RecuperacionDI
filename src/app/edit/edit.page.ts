import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { discocrudService } from '../core/discocrud.service';
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
  public discotecas: IDisco[];
  disco: IDisco = {
    id: undefined,
    nombre: undefined,

    numEntradas: undefined,
    precio: undefined,
    image: undefined
  }
  discoForm: FormGroup;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private discocrudService: discocrudService,
    public toastController: ToastController) { }

  ngOnInit() {
    this.retrieveValues();
    this.discoForm = new FormGroup({
      nombre: new FormControl(''),
      image: new FormControl(''),
      numEntradas: new FormControl(''),
      precio: new FormControl(''),
    });

  }

  ionViewDidEnter() {
    // Remove elements if it already has values
    this.retrieveValues();
  }

  retrieveValues() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.discocrudService.read_discos().subscribe(data => {
      this.discotecas = data.map(e => {
        if (this.id == e.payload.doc.id) {
          this.id = e.payload.doc.id;
          this.disco.id = e.payload.doc.id;
          this.disco.nombre = e.payload.doc.data()['nombre'];
          this.disco.numEntradas = e.payload.doc.data()['numEntradas'];
          this.disco.image = e.payload.doc.data()['image'];
          this.disco.precio = e.payload.doc.data()['precio'];
          this.displayProduct(this.disco);
          return {
            id: e.payload.doc.id,
            isEdit: false,
            nombre: e.payload.doc.data()['nombre'],
            numEntradas: e.payload.doc.data()['numEntradas'],
            image: e.payload.doc.data()['image'],
            precio: e.payload.doc.data()['precio'],
          };
        }

      })
      console.log(this.disco);
    });
  }

  displayProduct(disco: IDisco): void {
    if (this.discoForm) {
      this.discoForm.reset();
    }

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
    this.disco = this.discoForm.value;
    let record = {};
    record['nombre'] = this.disco.nombre;
    record['numEntradas'] = this.disco.numEntradas;
    record['image'] = this.disco.image;
    record['precio'] = this.disco.precio;
    this.discocrudService.update_disco(this.id, this.disco);
  }
  async removeRecord(id) {
    const toast = await this.toastController.create({
      header: 'Elimiar Discoteca',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'delete',
          text: 'ACEPTAR',
          handler: () => {
            this.discocrudService.delete_disco(id);
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
