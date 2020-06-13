import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DiscotecadbService } from '../core/discotecadbservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IDiscoteca } from '../share/interfaces';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  id: string;
  discoteca: IDiscoteca;
  discotecaForm: FormGroup;
  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private discotecadbService: DiscotecadbService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.discotecadbService.getItem(this.id).then(
      (data: IDiscoteca) => {
        this.discoteca = data
        this.discotecaForm.get('name').setValue(this.discoteca.name);
        this.discotecaForm.get('cover').setValue(this.discoteca.cover);
        this.discotecaForm.get('description').setValue(this.discoteca.description);
      }
    );
    this.discotecaForm = new FormGroup({
      name: new FormControl(''),
      genre: new FormControl(''),
      date: new FormControl(''),
      cover: new FormControl(''),
      description: new FormControl(''),
    });
  }
  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Guardar discoteca',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.saveDiscoteca();
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
  saveDiscoteca() {
    this.discotecadbService.remove(this.id);
    this.discoteca = this.discotecaForm.value;
    let nextKey = this.discoteca.name.trim();
    this.discoteca.id = nextKey;
    this.discotecadbService.setItem(nextKey, this.discoteca);
    console.warn(this.discotecaForm.value);
  }
}
