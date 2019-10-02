import { OnInit, Component, OnDestroy } from '@angular/core';
import {DashboardService } from '../../../@core/data/dashboard.service';

class Position{
  //top: pixel number measured from the top of the picture
  //left: pixel number measured from the top of the picture
  //x: kinexon x position
  //y: kinexon y position
  x: number; 
  y: number; 
  top: number; 
  left: number;
  visible= false;
  constructor(top: number,left: number , x: number, y: number){
    this.x = x; 
    this.y = y; 
    this.left = left; 
    this.top = top;  
  }
  getLeftTop(){
    return [this.left, this.top];
  }
  getXY(){
    return[this.x,this.y];
  }
  setVisibility(v:boolean){
    this.visible = v; 
  }
  toggleVisibility(){
    this.visible = !this.visible; 
  }
}

class AdvancedPosition extends Position{
  phi = 0; 
  // not mirrored, -1 mirrored
  mirrored = 1;
  constructor(top: number,left: number , x: number, y: number, phi:number){
    super(top, left, x,y); 
    this.phi = phi; 
  }
}
@Component({
  selector: 'bubblemap',
  template: `
  <div #halle_container>
   <img #halle src="assets/images/Hallenplan.png" >
	<svg  *ngFor ="let b of bubbles">
	<circle  nbPopover="Koordinate: {{b.x_kinexon}}/{{b.y_kinexon}} \nEntnommene {{b.name}}: {{b.anzahl}}" nbPopoverMode="hint" nbPopoverPlacement="top" [ngStyle]="{'fill': b.color, 'cx':b.x, 'cy':b.y , 'r':b.r }" *ngFor ="let b of bubbles"/>
	</svg>
	</div>
  `,
  styles:[`
  circle{
	position: absolute;
	opacity: 0.3;
}
circle:hover {
	opacity: 0.6;
}

svg {
	position: absolute;
	top: 0px;
	left: 0px;
	width: 1543px; 
	height: 497px;
	margin: 1.25rem;
}

 #halle_container {
	padding: 0px !important;
}`],
})
export class EchartsInventurBubblemapComponent  {
	point1: boolean = false;
  point2: boolean = false;
  halle = {y: 497, x:  1543};
  cols = 60; 
  rows = 20;
  name = "Rects"; 
  content:string; 
  rects = [];
  values= [{color : "rgba(200, 0,0, 0.4)", value : -1},{color: "rgba(0, 255,0, 0.4)", value : 1},{color: "rgba(250, 250, 100, 0.4)", value : 2},{color: "rgba(250, 130, 0, 0.4)", value : 3}];
  difficulty= this.values[1];
  cross1 = new Position(10,10, null,null);
  cross2 = new Position(20,20,null ,null);
  xy = new AdvancedPosition(100, 100 , 0 , 0, 0); 
  robotino = new Position(0, 0 , null ,null); 
  kinexon_array = [];
  distant_cross: Position; 
  interval = null; 
  orientation = 0; 
  //Gibt an, ob x in Richtung left lauft;
  x_left: boolean; 
  data:any; 
  teil_color ={
  	'1': '#000000',
  	'2': '#ff0000',
  	'3': '#A7C7C6',
  	'0': '#a59d9d'
  }
  teil_name ={
  	'1': 'schwarze Teile',
  	'2': 'rote Teile',
  	'3': 'silberne Teile',
  	'0': 'unbekannte Teile'
  }
  bubbles =[]; 

  constructor(private postService: DashboardService) { }


  ngOnInit() {
  	this.getAreaData(); 
  }

  changePosition(e){
  	if(this.point1) {
  		this.cross1.visible = true;
	  	this.cross1.left = e.offsetX  ;
	  	this.cross1.top =  e.offsetY ;
  	}
  	if(this.point2) {
  		this.cross2.visible = true;
  	  this.cross2.left =  e.offsetX;
  	  this.cross2.top =  e.offsetY  ;
  	}
  }
  generateRectArray(){
    this.rects = [];
    if(this.content == undefined || this.content == "")
    {
      for(var i= 0; i < this.rows; i++ )
      {
        for(var j=0; j < this.cols; j++)
          {
            this.rects.push({
              x: j * this.halle.x / this.cols,
              y: i * this.halle.y / this.rows,
              value: this.values[0],
              width: this.halle.x / this.cols,
              height: this.halle.y / this.rows,
            });

          }
      }
    }
    else {
      let array = this.content.split(',');
      array.map(x => parseInt(x));
      array.forEach((e, i) =>{
        let val = this.values[0]
        for(let i of this.values)
        {
          if(i.value == parseInt(e)){
            val = i; 
          }
        }
        this.rects.push({
          x: (i % this.cols) * this.halle.x / this.cols,
          y: ((i / this.cols)|0) * this.halle.y / this.rows,
          value: val,
          width: this.halle.x / this.cols,
          height: this.halle.y / this.rows,
        });
      });
     }
  }
  refresh(){
    this.content = "";
  	this.generateRectArray();
  }
  getAreaData(){
    	 this.postService.sendData(["area_read", null ,null]).subscribe(res => {
          try{
            if(res == null){
              console.log("Keine Responsedaten erhalten");
            }
            else{
              this.name = res["name"];
              this.content =res["content"];
              this.cross1.x = res["cross1_x"];
              this.cross1.y = res["cross1_y"];
              this.cross1.left = res["cross1_left"];
              this.cross1.top = res["cross1_top"];
              this.cross2.x = res["cross2_x"];
              this.cross2.y = res["cross2_y"];
              this.cross2.left = res["cross2_left"];
              this.cross2.top = res["cross2_top"];
              this.rows = res["rows"];
              this.cols = res["cols"];
              this.cross1.visible = true; 
              this.cross2.visible = true;
              this.getAxis();
              this.getEntnahmen();
            }

           }
          catch(e){
            console.error("Fehler Array Daten: "+ e.message);
          }
       }, 
       error => {
         console.error("Error Backend Commmunication: "+error.message);
         this.generateRectArray();
       },
       ()=> {
         this.generateRectArray();
       });     
  }
  getAxis(){
   //a,b,c,d fuer weitere Berechnungen benoetigt
    let a = this.cross2.x -this.cross1.x;
    let b = this.cross2.y -this.cross1.y; 
    let c = this.cross2.left -this.cross1.left; 
    let d = this.cross2.top -this.cross1.top;  
    // Wenn kein 2D Raum aufgespannt wird
    if(a == 0 || b == 0 ){
      console.error("Kein eindeutiges Koordinatensystem");
      return; 
    }
    //Wanung wenn Werte zu nah beieinanderliegen
    let ab_warning = 200; 
    if( Math.abs(a) < ab_warning || Math.abs(b) < ab_warning )
    {
      console.warn("Bitte weiter auseinanderliegende Orte waehlen");
    }
    let phi: number; 
    //wenn c/a das gleiche Verhaeltnis hat wie d/b , dann zeigt  x in +/- left
    //+/- entscheidet sich mit dem Vorzeichen
    if(Math.abs(c/a) -Math.abs( d/b) < Math.abs(c/ b) - Math.abs(d/a))
    {
      // x Richtung left
      this.xy.left= c/a * (a- this.cross2.x) + this.cross1.left; 
      this.xy.top = d/b * (b -this.cross2.y) + this.cross1.top
      this.x_left = true; 
      this.setOrientation(c/a, d/b); 
    }
    else{
      // x Richtung top 
      this.xy.left = (c/b * (b- this.cross2.y)+ this.cross1.left);
      this.xy.top =  (d/a * (a -this.cross2.x) + this.cross1.top);
      this.x_left = false;
      this.setOrientation(d/a,c/b); 
    }  
    //Durch die Spiegelung der Y-Achse muss nocheinaml weiter gedreht werden
    if(this.xy.mirrored == -1){
      phi = -90;
    } 
    else{
      phi = 0; 
    }
    //Drehung des Koordinatensystems
    this.xy.phi = this.orientation + phi;
    this.xy.visible = true;
    if(this.xy.left >= this.halle.x || this.xy.left <  0 || this.xy.top >= this.halle.y || this.xy.top < 0){
      this.xy.visible = false;
      console.warn("Nullpunkt außerhalb des Sichtfeldes");
    } 
    if((Math.pow(this.cross1.x,2)+Math.pow(this.cross1.y,2)) > (Math.pow(this.cross2.x,2)+Math.pow(this.cross2.y,2))){  
       this.distant_cross = this.cross1;
    }
    else{
      this.distant_cross = this.cross2;
    }
    this.fillKinexonArray();
  }

  fillKinexonArray(){
     this.rects.forEach((e, i) =>{
       let A = this.getKinexonFromPixel( e.x, e.y);
       this.kinexon_array.push({
         x: A[0],
         y: A[1],
         i: i, 
       });
     });
  }
  setOrientation(x_d, y_d){
    if(this.x_left){
      //>0 bedeuted in Richtung left/top , <0 gegen die Richutung
        if(x_d >0 && y_d >0){
          this.orientation = 90; 
          this.xy.mirrored  = -1;
        }
        if(x_d <=0 && y_d >0){
          this.orientation = -180; 
          this.xy.mirrored  = 1;
        }
        if(x_d <=0 && y_d <=0){
          this.orientation = -90; 
          this.xy.mirrored  = -1;
        }
        if(x_d >0 && y_d <=0){
          this.orientation = 0; 
          this.xy.mirrored  = 1;
        }
    }
    else{
       if(x_d >0 && y_d >0){
          this.orientation = 90; 
          this.xy.mirrored  = +1;
        }
        if(x_d <=0 && y_d >0){
          this.orientation = -180; 
          this.xy.mirrored  = -1;
        }
        if(x_d <=0 && y_d <=0){
          this.orientation = -90; 
          this.xy.mirrored  = +1;
        }
        if(x_d >0 && y_d <=0){
          this.orientation = 0; 
          this.xy.mirrored  = -1;
        }
    }
  }
  getKinexonFromPixel( left, top){
    if(!this.x_left) {
       let x = Math.round(this.distant_cross.x /(this.distant_cross.top -this.xy.top) * (top-  this.xy.top));
       let y = Math.round(this.distant_cross.y / (this.distant_cross.left -this.xy.left) * (left  - this.xy.left));
       return [x,y]; 
     }
     else  {
       let x = Math.round(this.distant_cross.y /(this.distant_cross.top -this.xy.top) * (top-  this.xy.top));
       let y = Math.round(this.distant_cross.x / (this.distant_cross.left -this.xy.left) * (left  - this.xy.left));
       return [x,y]; 
     }
  }
  getPixelFromKinexon( x, y){
    if(!this.x_left){
      let top = Math.round(x * (this.distant_cross.top - this.xy.top) / this.distant_cross.x + this.xy.top);
      let left = Math.round(y * (this.distant_cross.left - this.xy.left) / this.distant_cross.y + this.xy.left);
      return [left, top];
    }
    else {
      let top = Math.round(y * (this.distant_cross.top - this.xy.top) / this.distant_cross.y + this.xy.top);
      let left = Math.round(x * (this.distant_cross.left - this.xy.left) / this.distant_cross.x + this.xy.left);
      return [left, top];
    }
  }
  getEntnahmen(){
	 this.postService.sendData(["get_entnahmen", null ,null]).subscribe(res => {
          try{
            if(res == null){
              console.log("Keine Entnahmedaten erhalten");
            }
            else {
              this.data = res["data"];
              this.createBubbles(); 
            }
           }
          catch(e){
            console.error("Fehler Entnahme Daten: "+ e.message);
          }
       }, 
       error => {
         console.error("Error Backend Commmunication: "+error.message);
       });  
	}
	createBubbles(){
		let  max_anz = 0;
		for(let d of this.data){
			if(d["anzahl"] >= max_anz)
				max_anz = d["anzahl"]; 
		}
		for(let d of this.data)
		{
			let xy = this.getPixelFromKinexon( d["x"], d["y"]); 
			let r = Math.sqrt(d["anzahl"] / max_anz) * 30;
			let near_bubble = this.isNearBubble(d);
			if( near_bubble == null){
				this.bubbles.push({
					x_kinexon: d["x"],
					y_kinexon:  d["y"],
					x: xy[0],
					y: xy[1],
					r: r,
					teil: d["teil"], 
					color: this.teil_color[d["teil"]],
					name: this.teil_name[d["teil"]],
					anzahl: d["anzahl"] 
				});
			}
			else{
				near_bubble.anzahl +=  d["anzahl"]; 
			}

		}
	}
	isNearBubble(x){
		for(let b of this.bubbles){
			if(b.teil ==  x["teil"])
			{
				if(Math.sqrt(Math.pow(b.x_kinexon - x["x"],2 )+Math.pow(b.y_kinexon - x["y"],2 ))<=30)
					return b; 
			}
		}
		return null; 
	}
}
