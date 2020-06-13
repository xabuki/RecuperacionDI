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

  id: number;
  public disco: IDisco;
  discoForm: FormGroup;
  errorMessage: string;

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private discodbService: DiscodbService,
    public toastController: ToastController) { }

  ngOnInit() {
    this.discoForm = new FormGroup({
      nombre: new FormControl(''),
      image: new FormControl(''),
      numEntradas: new FormControl(''),
      precio: new FormControl(''),
    });
    this.id = parseInt(this.activatedroute.snapshot.params['id']);
    this.getDisco(this.id);

  }

  getDisco(id: number): void {
    this.discodbService.getDiscoById(id)
      .subscribe(
        (disco: IDisco) => this.displayDisco(disco),
        (error: any) => this.errorMessage = <any>error
      );
  }

  displayDisco(disco: IDisco): void {
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
    if (this.discoForm.valid) {
      if (this.discoForm.dirty) {
        this.disco = this.discoForm.value;
        this.disco.id = this.id;

        this.discodbService.updateDisco(this.disco)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );


      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.discoForm.reset();
    this.router.navigate(['']);
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
            this.discodbService.deleteDisco(id).subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
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
