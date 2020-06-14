import { Component, OnInit } from '@angular/core';
import { IDisco } from '../share/interfaces';
import { DiscodbService } from '../core/discodb.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public discos: IDisco[];
  discosInit: IDisco[] = [
    {
      id: "1",
      nombre: "Indara",
      image: "",
      numEntradas: 80,
      precio: 10
    },
    {
      id: "2",
      nombre: "Klabe",
      image: "",
      numEntradas: 47,
      precio: 20
    },
    {
      id: "3",
      nombre: "Totem",
      image: "",
      numEntradas: 52,
      precio: 5
    }
  ];

  constructor(private discodbService: DiscodbService, private route:
    Router) { }

  slideOpts = {
    initialSlide: 1,
    speed: 400
  }

  ngOnInit(): void {
    // If the database is empty set initial values
    this.inicialization();
  }
  ionViewDidEnter() {
    // Remove elements if it already has values
    if (this.discos !== undefined) {
      this.discos.splice(0);
    }
    this.retrieveValues();
  }
  inicialization() {
    if (this.discodbService.empty()) {
      this.discosInit.forEach(disco => {
        this.discodbService.setItem(disco.id, disco);
      });
    }
  }
  retrieveValues() {
    // Retrieve values
    this.discodbService.getAll().then(
      (data) => this.discos = data
    );
  }
  async discoTapped(disco) {
   this.route.navigate(['details', disco.id]);
  }
}


