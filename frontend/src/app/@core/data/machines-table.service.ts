import { Injectable } from '@angular/core';

@Injectable()
export class MachinesTableService {

  data = [{
    id: 1,
    machineName: 'CNC',
    x: 2343,
    y: 434,
    phi: 130,
    
  }, {
    id: 2,
    machineName: 'Lager',
    x: 7863,
    y: 1004,
    phi: 0,
  }, {
    id: 3,
    machineName: 'Drehmaschine',
    x: 2089,
    y: 834,
    phi: -41,
  },];

  getData() {
    return this.data;
  }
}
