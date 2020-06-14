import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { discocrudService } from '../core/discocrud.service';
import { IDisco } from '../share/interfaces';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  id: string;
  public discotecas: IDisco[];
  disco: IDisco = {
    id: undefined,
   nombre: undefined,
    numEntradas: undefined,
    precio: undefined,
    image: undefined
  }

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private discodbService: discocrudService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.retrieveValues();
  }

  ionViewDidEnter() {
    // Remove elements if it already has values
    this.retrieveValues();
  }

  retrieveValues() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.discodbService.read_discos().subscribe(data => {
      this.discotecas = data.map(e => {
        if (this.id == e.payload.doc.id) {
            this.id = e.payload.doc.id;
            this.disco.id = e.payload.doc.id;
            this.disco.nombre = e.payload.doc.data()['nombre'];
            this.disco.numEntradas = e.payload.doc.data()['numEntradas'];
            this.disco.image = e.payload.doc.data()['image'];
            this.disco.precio = e.payload.doc.data()['precio'];
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

  editRecord(disco) {
    this.router.navigate(['edit', disco.id])
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
            this.discodbService.delete_disco(id);
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
