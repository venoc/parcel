import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartsComponent } from './charts.component';
import { EchartsComponent } from './echarts/echarts.component';
import { EchartsUserComponent } from './echarts-user/echarts-user.component';
import { EchartsInventurComponent } from './echarts-inventur/echarts-inventur.component';


const routes: Routes = [{
  path: '',
  component: ChartsComponent,
  children: [{
    path: 'robotino',
    component: EchartsComponent,
  }, {
    path: 'inventur',
    component:  EchartsInventurComponent,
  }, {
    path: 'user',
    component:  EchartsUserComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsRoutingModule { }

export const routedComponents = [
  ChartsComponent,
   EchartsComponent,
   EchartsUserComponent,
   EchartsInventurComponent,


];
