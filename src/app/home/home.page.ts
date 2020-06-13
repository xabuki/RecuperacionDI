import { Component, OnInit } from '@angular/core';
import { IDiscoteca } from '../share/interfaces';
import { DiscotecadbService } from '../core/discotecadbservice.service';
import { Router } from '@angular/router';
import { DetailsPage } from '../details/details.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage implements OnInit {
  public discotecas: IDiscoteca[];
  discotecasinit: IDiscoteca[] = [
    {
      id: '1',
      name: 'Indara',
      cover:
        'https://owaytours.com/blog/wp-content/uploads/2019/08/discotecas-cordoba-min.jpg',
      description: "Indara es una discoteca localizada al lado de la estacion de autobuses en pamplona"
    },
    {
      id: '2',
      name: 'Klabe',
      cover: 'https://www.bilbaoplan.com/wp-content/uploads/2016/04/discoteca-1.jpg',
      description: "clave es una discoteca que se encuentra en pamplona"
    }
  ]
  constructor(private discotecadbService: DiscotecadbService, private route:
    Router) { }
  ngOnInit(): void {
    // If the database is empty set initial values
    this.inicialization();
  }
  ionViewDidEnter() {
    // Remove elements if it already has values
    if (this.discotecas !== undefined) {
      this.discotecas.splice(0);
    }
    this.retrieveValues();
  }
  inicialization() {
    if (this.discotecadbService.empty()) {
      this.discotecasinit.forEach(discoteca => {
        this.discotecadbService.setItem(discoteca.id, discoteca);
      });
    }
  }
  retrieveValues() {
    // Retrieve values
    this.discotecadbService.getAll().then(
      (data) => this.discotecas = data
    );
  }
  discotecaTapped(discoteca) {
    this.route.navigate(['details', discoteca.id]);
  }
}
