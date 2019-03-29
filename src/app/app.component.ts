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

  constructor(
    public _h: HttpService
    ) {
    this.brandicon = this._h.brandicon;
    this.settingsSource = this._h.settingsSource;
    this.topnavItems = this._h.topnavItems;
    this.brandname = this._h.brandname;
    this.footerItems = this._h.footerItems;
  }

  /**
   * Init gets:
   * Window location url into service
   * 
   * @memberof AppComponent
   */
  ngOnInit(): void {
    this._h.fileUrl = window.location.href;
    this._h.getSettings(this._h.settingsSource);
    
  }

}
