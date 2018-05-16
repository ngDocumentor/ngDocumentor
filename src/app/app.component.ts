import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from './commons/services/http/http.service';

// Interfaces for structure check. Options are becoming complex.
import { Menu, MenuLinks } from './commons/interfaces/menu/menu';
import { Sidebar, SidebarLinks, SidebarParentLinks } from './commons/interfaces/sidebar/sidebar';
import { Footer } from './commons/interfaces/footer/footer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @Input('sidebarSrc') sidebarSrc: string = 'assets/config/sidebar.json';

  @Input('topnavSrc') topnavSrc: string = 'assets/config/topnav.json';

  @Input('footerSrc') footerSrc: string = 'assets/config/footer.json';

  brandname: string = '  ';

  sidebarItems: (SidebarLinks | SidebarParentLinks)[] = [];

  topnavItems: MenuLinks[] = [];

  footer: Footer = { copyright: { tag: '', text: '', link: '/home', type: 'internal' }, nav: [], social: [] };

  constructor(private _h: HttpService) { }

  // Do a check for structure
  getTopnav(topnavSrc: string): void {
    const that = this;

    that._h.httpReq(topnavSrc, 'GET', null, null)
      .subscribe((data: Menu) => {
        that.topnavItems = data.nav ? data.nav : [];
        that.brandname = data.brandname ? data.brandname : '';
      }, (e: any) => {
        console.log(`
        Http Get Request error from topnav.json.
        Check if the name is right or if the path is right in the respective config file.
        Filenames are case sensitive.
        `, e);
      });
  }

  // Do a check for structure
  getSidebar(sidebarSrc: string): void {
    const that = this;

    that._h.httpReq(sidebarSrc, 'GET', null, null)
      .subscribe((data: Sidebar) => {
        that.sidebarItems = data.nav ? data.nav : [];
      }, (e: any) => {
        console.log(`
        Http Get Request error from sidebar.json. 
        Check if the name is right or if the path is right in the respective config file. 
        Filenames are case sensitive.
        `, e);
      });

  }

  // Do a check for structure
  getFooter(footerSrc: string): void {
    const that = this;

    that._h.httpReq(footerSrc, 'GET', null, null)
      .subscribe((data: Footer) => {
        let ftr = that.footer.copyright;
        if (!!data.copyright) {
          ftr.tag = data.copyright.tag ? data.copyright.tag : '';
          ftr.link = data.copyright.link ? data.copyright.link : '/home';
          ftr.type = data.copyright.type ? data.copyright.type : 'internal';
          ftr.text = data.copyright.text ? data.copyright.text : '';
        } else {
          ftr = null;
        }
        that.footer.nav = data.nav ? data.nav : [];
        that.footer.social = data.social ? data.social : [];
      }, (e: any) => {
        console.log(`
        Http Get Request error from footer.json. 
        Check if the name is right or if the path is right in the respective config file. 
        Filenames are case sensitive.
        `, e);
      });
  }

  ngOnInit(): void {
    let that = this;
    this._h.fileUrl = window.location.href;
    this._h.getRouteEvent();
    if (!!this._h.fileUrl) {
      console.log('DEBUG: Fileurl init', this._h.fileUrl);
      this._h.routeme.emit({ url: this._h.fileUrl, host: window.location.host });
    }
    // Get the items into the class arrays
    this.getTopnav(this.topnavSrc);
    this.getSidebar(this.sidebarSrc);
    this.getFooter(this.footerSrc);
  }
}
