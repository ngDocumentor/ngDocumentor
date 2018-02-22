import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from './commons/services/http/http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @Input('sidebarSrc') sidebarSrc: any = 'assets/config/sidebar.json';

  @Input('topnavSrc') topnavSrc: any = 'assets/config/topnav.json';

  brandname: string = ' { ngDocumentor } ';

  sidebarItems: any[] = [];

  topnavItems: any[] = [];

  constructor(private _http: HttpService) {
  }

  getTopnav(topnavSrc: string) { 
    const that = this;

    that._http.httpReq(topnavSrc, 'GET', null, null)
      .subscribe((data: any) => {
        if (!!data.topnav) {
          that.topnavItems = data.topnav;
          that.brandname = data.brandname;
        }
      }, (e: any) => {
        console.log('Http Get Request error from topnav.json', e);
      });
  }

  getSidebar(sidebarSrc: string) {
    const that = this;

    that._http.httpReq(sidebarSrc, 'GET', null, null)
      .subscribe((data: any) => {
        if (!!data.sidebar) {
          that.sidebarItems = data.sidebar;
        }
      }, (e: any) => {
        console.log('Http Get Request error from menu.json', e);
      });

  }

  

  ngOnInit() {

    // Get the items into the class arrays
    this.getTopnav(this.topnavSrc);
    this.getSidebar(this.sidebarSrc);
  }
}
