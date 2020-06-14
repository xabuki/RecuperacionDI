import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})

export class discocrudService {

  discotecas: any;
  constructor(
    private firestore: AngularFirestore
  ) { }
  create_disco(record) {
    return this.firestore.collection('discotecas').add(record);
  }
  read_discos() {
    return this.firestore.collection('discotecas').snapshotChanges();
  }
  update_disco(recordID, record) {
    this.firestore.doc('discotecas/' + recordID).update(record);
  }
  delete_disco(record_id) {
    this.firestore.doc('discotecas/' + record_id).delete();
  }
}