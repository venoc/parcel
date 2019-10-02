import { Component, OnInit , OnDestroy} from '@angular/core';
import {DashboardService } from '../../@core/data/dashboard.service';
import {EthcontractService } from '../../@core/data/ethcontract.service';
import 'rxjs/add/operator/map';


@Component({
  selector: 'area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  interval: any;
  constructor(private httpService: DashboardService, private ethService: EthcontractService) { }


  ngOnInit() {
    //this.interval = setInterval(() => {} ,1000);
  }
  ngOnDestroy(){
    /*if(this.interval){
      clearInterval(this.interval);
    }*/
  }
  newTruck(){
    this.httpService.sendGet("/newTruck").subscribe(res => {
      try{
        if(res != null){
            let x =  res;
            console.log(x['res']);
        }
        else{
          console.log("Keine Antwort");
        }
      }
      catch(e)
      {
        console.error("Fehler: "+e);
      }
    });
  }
  /*recieveTagData(i){
  	this.postService.sendData(["get_benutzer_tag", null, null]).subscribe(res => {
      try{
        if(res != null){
           i.x = res["x"];
           i.y = res["y"];
        }
        else{
          console.log("Keine TagDaten");
        }
      }
      catch(e)
      {
        console.error("Fehler TagDaten: "+e);
      }
    });
  }*/

}
