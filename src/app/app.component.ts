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

  @Input('settingsSrc') settingsSrc: string;

  brandname: string = '  ';

  brandicon: string;

  sidebarItems: (SidebarLinks | SidebarParentLinks)[];

  topnavItems: MenuLinks[];

  footerItems: Footer;

  constructor(public _h: HttpService) {
    this.brandicon = this._h.brandicon;
    this.settingsSrc = this._h.settingsSrc;
    this.topnavItems = this._h.topnavItems;
    this.brandname = this._h.brandname;
    this.footerItems = this._h.footerItems;
  }

  /**
   * Trigger routeme event (choose better name!)
   * Gets the topnav, sidebar, and footer
   *
   * @param {string} settingsSrc
   * @memberof AppComponent
   */
  getSettings(settingsSrc: string): void {
    let that = this;
    that._h.httpReq(settingsSrc, 'GET', null, null)
      .subscribe((data) => {
        /* Topnav item settings */
        that._h.brandicon = data.topnav.logo ? data.topnav.logo : '';
        that._h.topnavItems = data.topnav.nav ? data.topnav.nav : [];
        that._h.brandname = data.topnav.brandname ? data.topnav.brandname : '';
        that._h.topnav = data.topnav;

        /* Sidebar Items settings */
        that._h.sidebarItems = data.sidebar.nav ? data.sidebar.nav : [];
        that._h.sidebarnav = data.sidebar;

        /* Footer items settings */
        let ftr = that.footerItems.copyright;
        if (!!data.footer.copyright) {
          ftr.tag = data.footer.copyright.tag ? data.footer.copyright.tag : '';
          ftr.link = data.footer.copyright.link ? data.footer.copyright.link : '/home';
          ftr.type = data.footer.copyright.type ? data.footer.copyright.type : 'internal';
          ftr.text = data.footer.copyright.text ? data.footer.copyright.text : '';
        } else {
          ftr = null;
        }
        that._h.footerItems.nav = data.footer.nav ? data.footer.nav : [];
        that._h.footerItems.social = data.footer.social ? data.footer.social : [];
        that._h.footernav = data.footer;

        /* Home page settings */
        that._h.homePage = data.home;
        if (that._h.homePage.type === 'landing') {
          that._h.landingPage = true;
        }

        /* Search settings */
        that._h.searchSettings = data.search;

        that._h.getRouteEvent();

        if (!!that._h.fileUrl) {
          console.log('DEBUG: Fileurl init', that._h.fileUrl);
          that._h.routeme.emit({ url: that._h.fileUrl, host: window.location.host });
        }

      }, (e: any) => {
        console.log(`
          Http Get Request error from settings.json.
          Check if the name is right or if the path is right in the respective config file.
          Filenames are case sensitive.
      `, e);
      });
  }

  /**
   * Init gets:
   * Window location url into service
   * 
   * @memberof AppComponent
   */
  ngOnInit(): void {
    this._h.fileUrl = window.location.href;
    this.getSettings(this._h.settingsSrc);
  }

}
