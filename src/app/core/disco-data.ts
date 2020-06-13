import { InMemoryDbService } from 'angular-in-memory-web-api';

export class DiscoData implements InMemoryDbService {

  createDb() {
    let discos = [
      {
        id: 1,
        nombre: "Discoteca1",
        image: "",
        numEntradas: 5,
        precio: 2000
      },
      {
        id: 2,
        nombre: "Discoteca2",
        image: "",
        numEntradas: 3,
        precio: 1790
      },
      {
        id: 3,
        nombre: "Discoteca3",
        image: "",
        numEntradas: 5,
        precio: 1874
      }
    ];
    return { discos: discos };
  }
}
