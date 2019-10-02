import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {AreaComponent} from './area.component'; 
import { ThemeModule } from '../../@theme/theme.module';


const routes: Routes = [{
  path: '',
  component: AreaComponent,
  pathMatch: 'full',
  }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
  ],
  declarations: [AreaComponent],
  exports: [RouterModule],
})

export class AreaModule { }
