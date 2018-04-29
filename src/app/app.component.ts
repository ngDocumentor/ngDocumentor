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

  @Input('footerSrc') footerSrc: any = 'assets/config/footer.json';

  brandname: string = '  ';

  sidebarItems: any[] = [];

  topnavItems: any[] = [];

  footer: any = {copyright: '', text: '', link: '/home', type: 'internal', nav: [], social: []};

  constructor(private _h: HttpService) {
  }

  getTopnav(topnavSrc: string) {
    const that = this;

    that._h.httpReq(topnavSrc, 'GET', null, null)
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

    that._h.httpReq(sidebarSrc, 'GET', null, null)
      .subscribe((data: any) => {
        if (!!data.sidebar) {
          that.sidebarItems = data.sidebar;
        }
      }, (e: any) => {
        console.log('Http Get Request error from sidebar.json', e);
      });

  }

  getFooter(footerSrc: string) {
    const that = this;

    that._h.httpReq(footerSrc, 'GET', null, null)
      .subscribe((data: any) => {
        if (!!data.copyright) {
          that.footer = data;
        }
      }, (e: any) => {
        console.log('Http Get Request error from footer.json', e);
      });

  }

  ngOnInit() {
    let that = this;
    this._h.fileUrl = window.location.href;
    this._h.getRouteEvent();
    if (!!this._h.fileUrl) {
      console.log('DEBUG: fileurl', this._h.fileUrl);
      this._h.routeme.emit(this._h.fileUrl);
    }
    // Get the items into the class arrays
    this.getTopnav(this.topnavSrc);
    this.getSidebar(this.sidebarSrc);
    this.getFooter(this.footerSrc);
  }
}
