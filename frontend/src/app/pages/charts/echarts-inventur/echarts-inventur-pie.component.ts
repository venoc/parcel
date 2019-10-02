import { AfterViewInit, Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import {DashboardService } from '../../../@core/data/dashboard.service';

@Component({
  selector: 'ngx-echarts-inventur-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsInventurPieComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  data: any; 
  @Input() teil; 
  b= [];
  constructor(private theme: NbThemeService, private service: DashboardService) {
  }

  ngAfterViewInit() {
    this.service.sendData(["pie_diagram", "inventur" ,this.teil]).subscribe(res => {
        let s;
        try{
          this.data = res["data"];
          s  = this.data[0]["name"];
          let obj = {};
          obj["value"]  = this.data[0]["anzahl"];
          obj["name"]  = "Vorhanden";
          this.b.push(obj);
          obj = {};
          obj["value"]  = this.data[0]["max"] - this.data[0]["anzahl"];
          obj["name"]  = "Leer";
          this.b.push(obj);
          
            
          }
          catch(e)
          {
             console.log("Ortdaten fehlerhaft");
          }
          this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

            const colors = config.variables;
            const echarts: any = config.variables.echarts;
            this.options = {
              backgroundColor: echarts.bg,
              color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)',
              },
              legend: {
                orient: 'vertical',
                left: 'left',
                data: ["Vorhanden", "Leer"],
                textStyle: {
                  color: echarts.textColor,
                },
              },
              series: [
                {
                  name: s,
                  type: 'pie',
                  radius: '80%',
                  center: ['50%', '50%'],
                  data: this.b,
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: echarts.itemHoverShadowColor,
                    },
                  },
                  label : {
                                   show : false
                                  },
                         labelLine : {
                                       show : false
                                      },
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
