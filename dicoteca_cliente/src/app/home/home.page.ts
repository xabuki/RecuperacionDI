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
  haveValues: boolean = false;

  constructor(private discodbService: DiscodbService, private route:
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
    if(this.discos !== undefined){
      this.discos.splice(0);
    }
    this.retrieveValues();
  }

  retrieveValues(){
    this.discodbService.getDiscos().subscribe(
      (data: IDisco[]) => {
        this.haveValues = false;
        this.discos = data;
        this.haveValues = true;
      });
  }

  async discoTapped(disco) {
    this.route.navigate(['details', disco.id]);
  }
}


