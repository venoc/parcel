import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {EthcontractService } from '../../../@core/data/ethcontract.service'
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import {DashboardService } from '../../../@core/data/dashboard.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})

export class HeaderComponent implements OnInit {


  @Input() position = 'normal';
  user: any;
  interval:any;
  notis = [];
  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private ethService: EthcontractService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private service : DashboardService,
              private toasterService: ToasterService) {
  }
  config = new ToasterConfig({
          positionClass: 'toast-top-right',
          timeout: 5000,
          newestOnTop:true,
          tapToDismiss: true,
          preventDuplicates: false,
          animation: 'fade',
          limit: 5,
        });
  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nico);
    //this.interval = setInterval(() => {this.showToast('default', 'Test', 'Das ist ein Test')} ,4000);
  }
  ngOnDestroy(){
    if(this.interval){
      clearInterval(this.interval);
    }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  private showToast(type: string, title: string, body: string) {

         const toast: Toast = {
       type: type,
       title: title,
       body: body,
       timeout:5000,
       showCloseButton: false,
       bodyOutputType: BodyOutputType.TrustedHtml,
     };
     this.toasterService.popAsync(toast);
     this.pushNotis(title, body);
   }

   clearToasts() {
      this.toasterService.clear();
   }
   private pushNotis( ti: string , te: string){
     //title , text
     if(this.notis.length  == 5 ){
     this.notis.shift();
   }
   this.notis.push({title: ti, text: te,});
   }
}
