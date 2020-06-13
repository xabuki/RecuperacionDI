import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DiscodbService } from '../core/discodb.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  errorMessage: string;
  id:number;

  constructor(private router: Router,
    private discodbService: DiscodbService,
    private activatedroute: ActivatedRoute,
    public toastController: ToastController) { }

  ngOnInit() {
    this.discoForm = new FormGroup({
      nombre: new FormControl(''),
      image: new FormControl(''),
      numEntradas: new FormControl(''),
      precio: new FormControl(''),
    });
    this.id = parseInt(this.activatedroute.snapshot.params['productId']);
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
    if (this.discoForm.valid) {
      if (this.discoForm.dirty) {
        this.disco = this.discoForm.value;
        this.disco.id = this.id;
        
        this.discodbService.createDisco(this.disco)
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
}


