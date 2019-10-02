import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import {DashboardService } from '../../../@core/data/dashboard.service';

@Component({
  selector: 'ngx-machines-table',
  templateUrl: './machines-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class MachinesTableComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },

    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      x: {
        title: 'X-Koordinate',
        type: 'number',
        editor: {type: 'number'},
      },
      y: {
        title: 'Y-Koordinate',
        type: 'number',
        editor: {type: 'number'},
      },
      phi: {
        title: 'Ausrichtung',
        type: 'number',
        editor: {type: 'number'},
      },
    },
    noDataMessage: "Keine Daten gefunden",
    actions:{columnTitle  : "Aktionen",},
  }
  robotino = {
    x: null,
    y:null,
  }
  tag = {
    x : null,
    y : null,
  }


  source: LocalDataSource = new LocalDataSource();

  constructor(private service: DashboardService ) {
     this.service.sendData(["machine_read", null ,null]).subscribe(res => {
        try{
          console.log(res);
          this.source.load(res["data"]);

          }
          catch(e)
          {
             console.log("Ortdaten fehlerhaft");
          }
      });
    }
  onDeleteConfirm(event): void {
    if (window.confirm('Bist du sicher, dass du löschen willst?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event){
    let data  = event.newData;
    this.service.sendData(["machine_write", {"mode": "add", "value": data} ,null]).subscribe();
  }
  onSaveConfirm(event) {
    this.service.sendData(["machine_write", {"mode": "edit", "value": event.newData} ,null]).subscribe();
  }
  receiveTagData(){
    this.service.sendData(["get_benutzer_tag", null, null]).subscribe(res => {
      try{

        if(res != null){
           this.tag.x = res["x"];
           this.tag.y= res["y"];

        }
        else{
          console.log("Keine TagDaten");
          this.tag.x = null;
           this.tag.y= null;
        }
      }
      catch(e)
      {
        console.error("Fehler TagDaten: "+e);
        this.tag.x = null;
        this.tag.y= null;
      }
    });
  }
  receiveRobotinoData(){
    this.service.sendData( ["robotino_pos", null, null]).subscribe(res => {
        try{
          if(res != null){
            this.robotino.x = res["x"];
            this.robotino.y = res["y"];
          }
          else{
          console.log("Keine TagDaten");
          this.robotino.x = null;
          this.robotino.y = null;
          }
        }
        catch(e)
        {
          console.log("Fehler RobotinoDaten");
          this.robotino.x = null;
          this.robotino.y = null;
        }
      },
       error => {
         console.error("Error Robotino Postion Backend Commmunication: "+error.message);
       }
      );
  }
}
