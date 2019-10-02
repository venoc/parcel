import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { LocalDataSource } from 'ng2-smart-table';
import { ModalComponent } from './modal/modal.component';
import {MachinesTableService } from '../../@core/data/machines-table.service';
import { ToasterModule } from 'angular2-toaster';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  imports: [
    ThemeModule,
    ToasterModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    DashboardComponent,
    ModalComponent,
  ],
   providers: [
    MachinesTableService,
  ],
    entryComponents: [
    ModalComponent,
    ],
})
export class DashboardModule { }
