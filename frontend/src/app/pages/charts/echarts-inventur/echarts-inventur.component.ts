import { Component, OnInit , OnDestroy} from '@angular/core';
import {DashboardService } from '../../../@core/data/dashboard.service';

@Component({
  selector: 'ngx-echarts-inventur',
  styleUrls: ['./echarts-inventur.component.scss'],
  templateUrl: './echarts-inventur.component.html',
})
export class EchartsInventurComponent {
	areadata: any; 
	bubbles = []; 
	constructor(private service : DashboardService){}

	ngOnInit(){
		this.recieveEntnahmeData();
	}

	 recieveEntnahmeData(){
	  	this.service.sendData(["get_entnahmen", null, null]).subscribe(res => {
	      try{
	        if(res != null){
	           this.areadata = res["data"];   
	        }
	        else{
	          console.log("Keine EntnahmeDaten");
	        }
	      }
	      catch(e)
	      {
	        console.error("Fehler EntnahmeDaten: "+e); 
	      }
	    });
 	}

	auffuellen(i ){
		this.service.sendData(["auffuellen", i ,null]).subscribe();
	}
	
}
