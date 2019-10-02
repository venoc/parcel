import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import {DashboardService } from '../../../@core/data/dashboard.service';

@Component({
  selector: 'ngx-machines-soll-hist',
  templateUrl: './machines-soll-hist.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class MachinesSollHistComponent {

  settings = {
    columns: {

      name: {
        title: 'Name',
        type: 'string',
        editable: false, 
      },
      x: {
        title: 'X-Koordinate',
        type: 'number',
        editable: false, 
      },
      y: {
        title: 'Y-Koordinate',
        type: 'number',
        editable: false, 
      },
      phi: {
        title: 'Ausrichtung',
        type: 'number',
        editable: false, 
      },
      zeit: {
        title: 'Zeit',
        type: 'string',
        editable: false, 
      },
    },
    noDataMessage: "Keine Daten gefunden",
    actions:{add  : false, edit : false, delete : false,},
  };
  numbers = [10, 20, 30 ,50 ,100];
  number = 30; 



  source: LocalDataSource = new LocalDataSource();

  constructor(private service: DashboardService ) {
     this.loadData(); 
  }
  loadData(){
    this.service.sendData(["machine_soll_hist", this.number ,null]).subscribe(res => {
        try{
          this.source.load(res["data"]);

          }
          catch(e)
          {
             console.log("Ortdaten fehlerhaft");
          }
      });
    }
  
}

