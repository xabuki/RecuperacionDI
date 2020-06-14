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

  id: number;
  public disco: IDisco;

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private discodbService: DiscodbService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.id = parseInt(this.activatedroute.snapshot.params['id']);
    this.discodbService.getDiscoById(this.id).subscribe(
      (data: IDisco) => this.disco = data
    );
  }

  editRecord(disco) {
    this.router.navigate(['edit', disco.id])
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.router.navigate(['']);
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
            this.discodbService.deleteDisco(id).subscribe(
              () => this.onSaveComplete(),
            );
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
