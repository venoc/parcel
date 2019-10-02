import { Component} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {DashboardService } from '../../../@core/data/dashboard.service';

@Component({
  selector: 'ngx-dashboard-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {

  modalHeader: string;
  modalContent = ``;
  dividedButtonGroupOne = 0;
  teil = 0; 
  constructor(private activeModal: NgbActiveModal, private service: DashboardService ) { }

  closeModal() {
    this.activeModal.close();
    let t = null; 
    if(this.teil != 0)
      t = this.teil;
    this.service.sendData(["close_modal", t, this.dividedButtonGroupOne ]).subscribe();
  }

}
