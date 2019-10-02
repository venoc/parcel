import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import {DashboardService } from '../../../@core/data/dashboard.service';

@Component({
  selector: 'ngx-echarts-user-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsUserPieComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  data: any; 
  a = []
  b= [];
  constructor(private theme: NbThemeService, private service: DashboardService) {
  }

  ngAfterViewInit() {
    this.service.sendData(["pie_diagram", "user" ,null]).subscribe(res => {
        
        try{
          this.data = res["data"];
          
           for(let i = 0;i < this.data.length; i++ ){
              let s  = this.data[i]["x"]+"/" + this.data[i]["y"]+"/" +this.data[i]["phi"];
              let obj = {};
              obj["value"]  = this.data[i]["anzahl"];
              obj["name"]  = s;
              this.b.push(obj);
              this.a.push( s);      
            }
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
                data:this.a,
                textStyle: {
                  color: echarts.textColor,
                },
              },
              series: [
                {
                  name: 'Koordinate',
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
