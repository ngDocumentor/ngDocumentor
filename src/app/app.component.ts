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

  @Input('sidebarSrc') sidebarSrc: string;

  @Input('topnavSrc') topnavSrc: string;

  @Input('footerSrc') footerSrc: string;

  brandname: string = '  ';

  sidebarItems: (SidebarLinks | SidebarParentLinks)[];

  topnavItems: MenuLinks[];

  footerItems: Footer;

  constructor(private _h: HttpService) {
    this.topnavSrc = this._h.topnavSrc;
    this.sidebarSrc = this._h.sidebarSrc;
    this.footerSrc = this._h.footerSrc;
    this.topnavItems = this._h.topnavItems;
    this.brandname = this._h.brandname;
    this.footerItems = this._h.footerItems;
  }


  /**
   * Get the topnav.json file
   * Do a check for structure of object
   * Basic missing file and objects handled
   * 
   * @param {string} topnavSrc topnav.json file path
   * @memberof AppComponent
   */
  getTopnav(topnavSrc: string): void {
    const that = this;

    that._h.httpReq(topnavSrc, 'GET', null, null)
      .subscribe((data: Menu) => {
        that._h.topnavItems = data.nav ? data.nav : [];
        that._h.brandname = data.brandname ? data.brandname : '';
        that._h.topnav = data;
      }, (e: any) => {
        console.log(`
        Http Get Request error from topnav.json.
        Check if the name is right or if the path is right in the respective config file.
        Filenames are case sensitive.
        `, e);
      });
  }

  /**
   * Get sidebar.json file
   * Do a check for structure of object
   * Basic mising file and objects handled
   * 
   * @param {string} sidebarSrc sidebar.json file path
   * @memberof AppComponent
   */
  getSidebar(sidebarSrc: string): void {
    const that = this;

    that._h.httpReq(sidebarSrc, 'GET', null, null)
      .subscribe((data: Sidebar) => {
        that._h.sidebarItems = data.nav ? data.nav : [];
        that._h.sidebarnav = data;
      }, (e: any) => {
        console.log(`
        Http Get Request error from sidebar.json. 
        Check if the name is right or if the path is right in the respective config file. 
        Filenames are case sensitive.
        `, e);
      });

  }

  /**
   * Get footer.json file
   * Do a check for structure of object
   * Basic missing file and objects handled
   * 
   * @param {string} footerSrc footer.json file path
   * @memberof AppComponent
   */
  getFooter(footerSrc: string): void {
    const that = this;

    that._h.httpReq(footerSrc, 'GET', null, null)
      .subscribe((data: Footer) => {
        let ftr = that.footerItems.copyright;
        if (!!data.copyright) {
          ftr.tag = data.copyright.tag ? data.copyright.tag : '';
          ftr.link = data.copyright.link ? data.copyright.link : '/home';
          ftr.type = data.copyright.type ? data.copyright.type : 'internal';
          ftr.text = data.copyright.text ? data.copyright.text : '';
        } else {
          ftr = null;
        }
        that._h.footerItems.nav = data.nav ? data.nav : [];
        that._h.footerItems.social = data.social ? data.social : [];
        that._h.footernav = data;
      }, (e: any) => {
        console.log(`
        Http Get Request error from footer.json. 
        Check if the name is right or if the path is right in the respective config file. 
        Filenames are case sensitive.
        `, e);
      });
  }

  /**
   * Init gets:
   * Window location url into service
   * Trigger routeme event (choose better name!)
   * Gets the topnav, sidebar, and footer
   * 
   * @memberof AppComponent
   */
  ngOnInit(): void {
    let that = this;
    this._h.fileUrl = window.location.href;
    this.getTopnav(this._h.topnavSrc);
    this.getSidebar(this._h.sidebarSrc);
    this.getFooter(this._h.footerSrc);

    this._h.getRouteEvent();
    // Get the items into the class arrays

    if (!!this._h.fileUrl) {
      console.log('DEBUG: Fileurl init', this._h.fileUrl);
      this._h.routeme.emit({ url: this._h.fileUrl, host: window.location.host });
    }
  }
}
