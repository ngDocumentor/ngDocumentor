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

  /**
   *
   *
   * @type {string}
   * @memberof AppComponent
   */
  @Input('settingsSource') settingsSource: string;

  /**
   *
   *
   * @type {string}
   * @memberof AppComponent
   */
  brandname: string = '  ';

  /**
   *
   *
   * @type {string}
   * @memberof AppComponent
   */
  brandicon: string;

  /**
   *
   *
   * @type {((SidebarLinks | SidebarParentLinks)[])}
   * @memberof AppComponent
   */
  sidebarItems: (SidebarLinks | SidebarParentLinks)[];

  /**
   *
   *
   * @type {MenuLinks[]}
   * @memberof AppComponent
   */
  topnavItems: MenuLinks[];

  /**
   *
   *
   * @type {Footer}
   * @memberof AppComponent
   */
  footerItems: Footer;

  constructor(public _h: HttpService) {
    this.brandicon = this._h.brandicon;
    this.settingsSource = this._h.settingsSource;
    this.topnavItems = this._h.topnavItems;
    this.brandname = this._h.brandname;
    this.footerItems = this._h.footerItems;
  }

  /**
   * Trigger routeme event (choose better name!)
   * Gets the topnav, sidebar, and footer
   *
   * @param {string} settingsSource
   * @memberof AppComponent
   */
  getSettings(settingsSource: string): void {

    this._h.httpReq(settingsSource, 'GET', null, null)
      .subscribe(function (data) {

        /* Apply file type from settings file */
        this._h.fileType = data.filetype ? data.filetype : 'md';

        /* Topnav item settings */
        this._h.brandicon = data.topnav.logo ? data.topnav.logo : '';
        this._h.topnavItems = data.topnav.nav ? data.topnav.nav : [];
        this._h.brandname = data.topnav.brandname ? data.topnav.brandname : '';
        this._h.topnav = data.topnav;

        /* Sidebar Items settings */
        this._h.sidebarItems = data.sidebar.nav ? data.sidebar.nav : [];
        this._h.sidebarnav = data.sidebar;

        /* Footer items settings */
        let ftr = this.footerItems.copyright;
        if (!!data.footer.copyright) {
          ftr.tag = data.footer.copyright.tag ? data.footer.copyright.tag : '';
          ftr.link = data.footer.copyright.link ? data.footer.copyright.link : data.home ? data.home.url : '#/';
          ftr.type = data.footer.copyright.type ? data.footer.copyright.type : 'internal';
          ftr.text = data.footer.copyright.text ? data.footer.copyright.text : '';
        } else {
          ftr = null;
        }
        this._h.footerItems.nav = data.footer.nav ? data.footer.nav : [];
        this._h.footerItems.social = data.footer.social ? data.footer.social : [];
        this._h.footernav = data.footer;

        /* Home page settings */
        this._h.homePage = data.home;

        if (this._h.homePage.type === 'landing') {
          // This is creating an issue where search url load is enabling the landingPage before the search results
          //this._h.landingPage = true;
        }

        /* Search settings */
        this._h.searchSettings = data.search;

        this._h.getRouteEvent();

        if (!!this._h.fileUrl) {
          console.log('DEBUG: Fileurl init', this._h.fileUrl);
          this._h.routeme.emit({ url: this._h.fileUrl, host: window.location.host });
        }

      }.bind(this), (e: any) => {
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
    this.getSettings(this._h.settingsSource);
  }

}
