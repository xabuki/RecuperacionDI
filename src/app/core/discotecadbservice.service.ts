import { Injectable } from '@angular/core';
import { IDiscoteca } from '../share/interfaces';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class DiscotecadbService {
  auxMovie: IDiscoteca;
  auxMovieList: IDiscoteca[] = [];
  constructor(private storage: Storage) { }
  // Stores a value
  setItem(reference: string, value: IDiscoteca) {
    this.storage.set(reference, {
      id: value.id, name: value.name, 
       cover: value.cover, description:
        value.description
    })
      .then(
        (data) => console.log('Se guardo la discoteca', data),
        error => console.error('Error al guardar discoteca', error)
      );
  }
  // Gets a stored item
  getItem(reference): Promise<IDiscoteca> {
    return this.storage.get(reference);
  }
  // check if it is empty
  empty() {
    return this.storage.keys()
      .then(
        (data) => { return true },
        error => { return false }
      );
  }
  // Retrieving all keys
  keys(): Promise<string[]> {
    return this.storage.keys();
  }
  // Retrieving all values
  getAll(): Promise<IDiscoteca[]> {
    return this.storage.keys().then((k) => {
      k.forEach(element => {
        this.getItem(element).then(
          (data: IDiscoteca) => this.auxMovieList.push(data)
        );
      });
      return this.auxMovieList;
    });
  }
  // Removes a single stored item
  remove(reference: string) {
    this.storage.remove(reference)
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }
  // Removes all stored values.
  clear() {
    this.storage.clear()
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }
}
