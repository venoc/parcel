import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card (click)="handleClick()" [ngClass]="{'off': !on}">
      <div class="icon-container">
        <div class="icon {{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title">{{ title }}</div>
        <div class="status">{{ on ? 'ON' : 'OFF' }}</div>
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent {
  @Output('stateChange') changeEvent: EventEmitter<any>; 
  @Input() title: string;
  @Input() type: string;
  @Input() on = false;

  constructor(){
    this.changeEvent = new EventEmitter();
  }

  public handleClick()
  {
    this.on = !this.on; 
    this.changeEvent.emit(this.on);

  }
  
}
