import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MachinesComponent } from './machines.component';
import { MachinesTableComponent } from './machines-table/machines-table.component';
import { MachinesSollHistComponent } from './machines-soll-hist/machines-soll-hist.component';

const routes: Routes = [{
  path: '',
  component: MachinesComponent,
  children: [{
    path: 'machines-table',
    component: MachinesTableComponent,
  },{
    path: 'machines-soll-hist',
    component: MachinesSollHistComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MachinesRoutingModule { }

export const routedComponents = [
  MachinesComponent,
  MachinesTableComponent,
  MachinesSollHistComponent,
];
