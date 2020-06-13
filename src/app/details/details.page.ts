import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscotecadbService } from '../core/discotecadbservice.service';
import { IDiscoteca } from '../share/interfaces';
import { ToastController } from '@ionic/angular';
@Component({
 selector: 'app-details',
 templateUrl: './details.page.html',
 styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
 id: string;
 public discoteca: IDiscoteca;
 constructor(
  private activatedrouter: ActivatedRoute,
  private router: Router,
  private moviedbService: DiscotecadbService,
  public toastController: ToastController
  ) { }
  ngOnInit() {
  this.id = this.activatedrouter.snapshot.params.id;
  this.moviedbService.getItem(this.id).then(
  (data:IDiscoteca)=> this.discoteca = data
  );
  }
 
  editRecord(discoteca){
  this.router.navigate(['edit',discoteca.id])
  }
  async removeRecord(id) {
  const toast = await this.toastController.create({
  header: 'Elimiar discoteca',
  position: 'top',
  buttons: [
  {
  side: 'start',
  icon: 'delete',
  text: 'ACEPTAR',
  handler: () => {
  this.moviedbService.remove(id);
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
