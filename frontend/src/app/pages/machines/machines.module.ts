import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { MachinesRoutingModule, routedComponents } from './machines-routing.module';
import { MachinesTableService } from '../../@core/data/machines-table.service';

@NgModule({
  imports: [
    ThemeModule,
    MachinesRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    MachinesTableService,
  ],
})
export class MachinesModule { }
