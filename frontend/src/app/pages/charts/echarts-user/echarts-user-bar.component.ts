import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import {DashboardService } from '../../../@core/data/dashboard.service';
@Component({
  selector: 'ngx-echarts-user-bar',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsUserBarComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  data: any; 
  constructor(private theme: NbThemeService,  private service: DashboardService) {
  }

  ngAfterViewInit() {
    this.service.sendData(["bar_diagram_week", "user" ,null]).subscribe(res => {
        let a = [0,0,0,0,0,0,0];
        try{
          this.data = res["data"];
          
           for(let i = 0;i < this.data.length; i++ ){
                a[this.data[i]["tag"]]= this.data[i]["anzahl"];
            }
          }
          catch(e)
          {
             console.log("Ortdaten fehlerhaft");
          }
          this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

            const colors: any = config.variables;
            const echarts: any = config.variables.echarts;

            this.options = {
              backgroundColor: echarts.bg,
              color: [colors.primaryLight],
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow',
                },
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
              },
              xAxis: [
                {
                  type: 'category',
                  data: ['So','Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
                  axisTick: {
                    alignWithLabel: true,
                  },
                  axisLine: {
                    lineStyle: {
                      color: echarts.axisLineColor,
                    },
                  },
                  axisLabel: {
                    textStyle: {
                      color: echarts.textColor,
                    },
                  },
                },
              ],
              yAxis: [
                {
                  type: 'value',
                  axisLine: {
                    lineStyle: {
                      color: echarts.axisLineColor,
                    },
                  },
                  splitLine: {
                    lineStyle: {
                      color: echarts.splitLineColor,
                    },
                  },
                  axisLabel: {
                    textStyle: {
                      color: echarts.textColor,
                    },
                  },
                },
              ],
              series: [
                {
                  name: 'Fahrten',
                  type: 'bar',
                  barWidth: '60%',
                  data: a,
                },
              ],
            };
          });
     });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
