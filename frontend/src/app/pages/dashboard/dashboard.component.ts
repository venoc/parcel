import { Component , ViewChild,  OnInit, OnDestroy} from '@angular/core';
import {DashboardService } from '../../@core/data/dashboard.service';
import {EthcontractService } from '../../@core/data/ethcontract.service';
import { ModalComponent } from './modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  blockchainParcels = [];
  interval: any;
  interval2: any;
  myAccount : any;
  newParcel: any;
  unefficentParcels = [];
	constructor(private service : DashboardService, private ethService: EthcontractService , private modalService: NgbModal,private toasterService: ToasterService){
	}
	config = new ToasterConfig({
		      positionClass: 'toast-top-right',
		      timeout: 5000,
		      newestOnTop:true,
		      tapToDismiss: true,
		      preventDuplicates: false,
		      animation: 'fade',
		      limit: 5,
		    });
ngOnInit(){
  this.myAccount =  {addr: '0x00', balance: 0};
  this.ethService.getAccountInfo().then((res)=> {
    if(res != null){
      this.myAccount = res;
      this.ethService.getParcelCount().then((res)=> {
        if(res != null){
          this.ethService.getParcels(res,(res)=> {
            if(res != null){
              this.blockchainParcels = res;
            }
            });
        }
        }, (rej)=>{console.log(rej)});
    }

  }, (rej)=>{console.log(rej)});

	this.interval = setInterval(() => {this.getTruckData()} ,200);
  this.interval2 = setInterval(() => {this.getBlockchainData()} ,4000);
	}

	ngOnDestroy(){
		if(this.interval){
			clearInterval(this.interval);
		}
    if(this.interval2){
			clearInterval(this.interval2);
		}
	}
getBlockchainData(){
  this.ethService.getParcelCount().then((res)=> {
    if(res != null){

      this.ethService.getParcels(res,(res, rej)=> {
        if(res != null){
          this.blockchainParcels = res;
        }
        });
    }
    }, (rej)=>{console.log(rej)});
}
 private showToast(type: string, title: string, body: string) {

		    const toast: Toast = {
		      type: type,
		      title: title,
		      body: body,
		      timeout:5000,
		      showCloseButton: false,
		      bodyOutputType: BodyOutputType.TrustedHtml,
		    };
		    this.toasterService.popAsync(toast);
		  }

	clearToasts() {
		 this.toasterService.clear();
	}
  gbps(activate, id){
    let parcel;
    for(let p of this.unefficentParcels){
      if(p.parcel.id == id){
        activate? p.edit = 2 : p.edit = 1;
        if(activate){
          //this.blockchainParcels.push(p.parcel);
          this.ethService.newParcel(p.parcel).then((res)=> {

            }, (rej)=>{console.log(rej)});
        }

      }
    }
  }

  getTruckData(){
    this.service.sendGet("/getParcel").subscribe(res => {

      try{

        if(res["res"] != null){
            this.newParcel = res['res'];
            console.log(this.newParcel.id);
            let type_parcel = "success"
            if(this.newParcel.efficent == false){
              type_parcel = "error";
              this.unefficentParcels.push({parcel: this.newParcel, edit: 0});
            }

            this.showToast(type_parcel ,"Package " + String(this.newParcel.id),"Size: " + String(this.newParcel.size)+"g");
        }

      }
      catch(e)
      {
        console.error("Fehler: "+e);
      }
    });
  }
}
