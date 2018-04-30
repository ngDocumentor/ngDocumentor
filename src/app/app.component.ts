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

  footer: any = { copyright: { tag: '', text: '', link: '/home', type: 'internal' }, nav: [], social: [] };

  constructor(private _h: HttpService) {
  }

  getTopnav(topnavSrc: string) {
    const that = this;

    that._h.httpReq(topnavSrc, 'GET', null, null)
      .subscribe((data: any) => {
        if (!!data.nav) {
          that.topnavItems = data.nav;
        }
        if (!!data.brandname) {
          that.brandname = data.brandname;
        }
      }, (e: any) => {
        console.log(`
        Http Get Request error from topnav.json. 
        Check if the name is right or if the path is right. 
        Filenames are case sensitive.
        `, e);
      });
  }

  getSidebar(sidebarSrc: string) {
    const that = this;

    that._h.httpReq(sidebarSrc, 'GET', null, null)
      .subscribe((data: any) => {
        if (!!data.nav) {
          that.sidebarItems = data.nav;
        }
      }, (e: any) => {
        console.log(`
        Http Get Request error from sidebar.json. 
        Check if the name is right or if the path is right. 
        Filenames are case sensitive.
        `, e);
      });

  }

  getFooter(footerSrc: string) {
    const that = this;

    that._h.httpReq(footerSrc, 'GET', null, null)
      .subscribe((data: any) => {
        if (!!data.copyright) {
          that.footer.copyright.tag = data.copyright.tag || '';
          that.footer.copyright.link = data.copyright.link || '/home';
          that.footer.copyright.type = data.copyright.type || 'internal';
          that.footer.copyright.text = data.copyright.text || '';
        } else {
          that.footer.copyright = false;
        }
        if (!!data.nav) { that.footer.nav = data.nav; }
        if (!!data.social) { that.footer.social = data.social; }
      }, (e: any) => {
        console.log(`
        Http Get Request error from footer.json. 
        Check if the name is right or if the path is right. 
        Filenames are case sensitive.
        `, e);
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
