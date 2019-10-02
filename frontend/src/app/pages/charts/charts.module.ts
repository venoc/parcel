import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';

import { ThemeModule } from '../../@theme/theme.module';

import { ChartsRoutingModule, routedComponents } from './charts-routing.module';

import { EchartsLineComponent } from './echarts/echarts-line.component';
import { EchartsPieComponent } from './echarts/echarts-pie.component';
import { EchartsBarComponent } from './echarts/echarts-bar.component';
import { EchartsMultipleXaxisComponent } from './echarts/echarts-multiple-xaxis.component';
import { EchartsAreaStackComponent } from './echarts/echarts-area-stack.component';
import { EchartsBarAnimationComponent } from './echarts/echarts-bar-animation.component';
import { EchartsRadarComponent } from './echarts/echarts-radar.component';
import { EchartsInventurLineComponent } from './echarts-inventur/echarts-inventur-line.component';
import { EchartsInventurPieComponent } from './echarts-inventur/echarts-inventur-pie.component';
import { EchartsInventurBarComponent } from './echarts-inventur/echarts-inventur-bar.component';
import { EchartsInventurMultipleXaxisComponent } from './echarts-inventur/echarts-inventur-multiple-xaxis.component';
import {EchartsInventurAreaStackComponent } from './echarts-inventur/echarts-inventur-area-stack.component';
import {EchartsInventurBarAnimationComponent } from './echarts-inventur/echarts-inventur-bar-animation.component';
import { EchartsInventurRadarComponent } from './echarts-inventur/echarts-inventur-radar.component';
import { EchartsUserLineComponent } from './echarts-user/echarts-user-line.component';
import { EchartsUserPieComponent } from './echarts-user/echarts-user-pie.component';
import { EchartsUserBarComponent } from './echarts-user/echarts-user-bar.component';
import { EchartsUserMultipleXaxisComponent } from './echarts-user/echarts-user-multiple-xaxis.component';
import {EchartsUserAreaStackComponent } from './echarts-user/echarts-user-area-stack.component';
import {EchartsUserBarAnimationComponent } from './echarts-user/echarts-user-bar-animation.component';
import { EchartsUserRadarComponent } from './echarts-user/echarts-user-radar.component';
import {EchartsInventurBubblemapComponent } from './echarts-inventur/echarts-inventur-bubblemap.component';

const components = [

  EchartsLineComponent,
  EchartsPieComponent,
  EchartsBarComponent,
  EchartsMultipleXaxisComponent,
  EchartsAreaStackComponent,
  EchartsBarAnimationComponent,
  EchartsRadarComponent,
  EchartsInventurLineComponent,
  EchartsInventurPieComponent,
  EchartsInventurBarComponent,
  EchartsInventurMultipleXaxisComponent,
  EchartsInventurAreaStackComponent,
  EchartsInventurBarAnimationComponent,
  EchartsInventurRadarComponent,
  EchartsUserLineComponent,
  EchartsUserPieComponent,
  EchartsUserBarComponent,
  EchartsUserMultipleXaxisComponent,
  EchartsUserAreaStackComponent,
  EchartsUserBarAnimationComponent,
  EchartsUserRadarComponent,
  EchartsInventurBubblemapComponent
];

@NgModule({
  imports: [ThemeModule, ChartsRoutingModule, NgxEchartsModule, NgxChartsModule, ChartModule],
  declarations: [...routedComponents, ...components],
})
export class ChartsModule {}
