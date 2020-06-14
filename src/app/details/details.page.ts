import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscodbService } from '../core/discodb.service';
import { IDisco } from '../share/interfaces';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  id: string;
  public disco: IDisco;

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private discodbService: DiscodbService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.id = this.activatedroute.snapshot.params.id;
    this.discodbService.getItem(this.id).then(
      (data: IDisco) => this.disco = data
    );
  }

  editRecord(disco) {
    this.router.navigate(['edit', disco.id])
  }

  async removeRecord(id) {
    const toast = await this.toastController.create({
      header: 'Eliminar Discoteca',
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
