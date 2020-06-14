import { Component, OnInit } from '@angular/core';
import { IDisco } from '../share/interfaces';
import { discocrudService } from '../core/discocrud.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public discotecas: IDisco[];

  constructor(private discocrudService: discocrudService, private route:
    Router) { }

  slideOpts = {
    initialSlide: 1,
    speed: 400
  }

  ngOnInit(): void {
    // If the database is empty set initial values
    this.retrieveValues();
    
  }

  ionViewDidEnter(){
    this.retrieveValues();
  }

  retrieveValues(){
    this.discocrudService.read_discos().subscribe(data => {
      this.discotecas = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          nombre: e.payload.doc.data()['nombre'],
          numEntradas: e.payload.doc.data()['numEntradas'],
          image: e.payload.doc.data()['image'],
          precio: e.payload.doc.data()['precio'],
        };
      })
      console.log(this.discotecas);
    });
  }

  async discoTapped(disco) {
    this.route.navigate(['details', disco.id]);
  }
}


