import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'manual-input',
  templateUrl: './manual-input.component.html',
  styleUrls: ['./manual-input.component.scss']
})
export class ManualInputComponent implements OnInit {
  @Input() stop_driving :boolean = false;
  button = "BREAK"; 
	data = {
		x_value: null,
		y_value: null,
    phi_value: 0.0,
	};
  @Output() send= new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.stop_driving? this.button = "GO": this.button = "BREAK";
  }

  httpSend(){
    let d = {
      x:this.data.x_value,
      y:this.data.y_value,
      phi:this.data.phi_value,
    }
    this.data.x_value = null;
    this.data.y_value = null;
    this.data.phi_value = 0.0;
  	if(d.x && d.y)
  		this.send.emit(["manual", d]);
  }
   httpBreak(){
     this.stop_driving = !this.stop_driving;
     this.stop_driving? this.button = "GO": this.button = "BREAK";
     console.log(this.stop_driving);
      this.send.emit(["stopDrivingButton", this.stop_driving]);
  }

}
