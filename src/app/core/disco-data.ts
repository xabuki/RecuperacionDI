import { InMemoryDbService } from 'angular-in-memory-web-api';

export class DiscoData implements InMemoryDbService {

  createDb() {
    let discos = [
      {
        id: 1,
        nombre: "Indara",
        image: "",
        numEntradas: 58,
        precio: 10
      },
      {
        id: 2,
        nombre: "klabe",
        image: "",
        numEntradas: 80,
        precio: 5
      },
      {
        id: 3,
        nombre: "Totem",
        image: "",
        numEntradas: 70,
        precio: 7
      }
    ];
    return { discos: discos };
  }
}
