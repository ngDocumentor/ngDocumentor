import { Injectable, EventEmitter, Inject, ApplicationRef, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { MarkdownService } from 'ngx-markdown';
import { map } from 'rxjs/operators';
import { WorkerService } from '../worker/worker.service';


// Interfaces for structure check. Options are becoming complex.
import { Menu, MenuLinks } from '../../../commons/interfaces/menu/menu';
import { Sidebar, SidebarLinks, SidebarParentLinks } from '../../../commons/interfaces/sidebar/sidebar';
import { Footer } from '../../../commons/interfaces/footer/footer';
import { Router } from '@angular/router';

declare var settingsFile: string;

if (!settingsFile) {
  settingsFile = 'json';
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  /**
   *
   *
   * @type {HttpClient}
   * @memberof HttpService
   */
  http: HttpClient;

  /**
   *
   *
   * @type {string}
   * @memberof HttpService
   */
  settingsFileType: string;

    /**
   *
   *
   * @type {string}
   * @memberof HttpService
   */
  fileUrl: string;

  /**
   *
   *
   * @type {*}
   * @memberof HttpService
   */
  topnav: any;

  /**
   *
   *
   * @type {*}
   * @memberof HttpService
   */
  sidebarnav: any;

  /**
   *
   *
   * @type {*}
   * @memberof HttpService
   */
  footernav: any;

  /**
   *
   *
   * @type {string}
   * @memberof HttpService
   */
  settingsSource: string = 'assets/config/settings.' + settingsFile;

  /**
   *
   *
   * @type {MenuLinks[]}
   * @memberof HttpService
   */
  topnavItems: MenuLinks[] = [];

  /**
   *
   *
   * @type {string}
   * @memberof HttpService
   */
  brandname: string = '';

  /**
   *
   *
   * @type {string}
   * @memberof HttpService
   */
  brandicon: string = '';

  /**
   *
   *
   * @type {((SidebarLinks | SidebarParentLinks)[])}
   * @memberof HttpService
   */
  sidebarItems: (SidebarLinks | SidebarParentLinks)[] = [];

  /**
   *
   *
   * @type {Footer}
   * @memberof HttpService
   */
  footerItems: Footer = { copyright: { tag: '', text: '', link: '/home', type: 'internal' }, nav: [], social: [] };

  /**
   *
   *
   * @type {*}
   * @memberof HttpService
   */
  homePage: any;

  /**
   *
   *
   * @type {boolean}
   * @memberof HttpService
   */
  landingPage: boolean = false;

  /**
   *
   *
   * @type {string}
   * @memberof HttpService
   */
  searchValue: string = '';

  searchFormValue: {search: string, type: string} = {search: '', type: 'adv'};
  
  /**
   *
   *
   * @memberof HttpService
   */
  searchResults = false;

  /**
   *
   *
   * @type {*}
   * @memberof HttpService
   */
  searchSettings: any;

  /**
   *
   *
   * @type {string[]}
   * @memberof HttpService
   */
  searchUrlList: string[] = [];

  /**
   *
   *
   * @type {string}
   * @memberof HttpService
   */
  fileType: string = 'md';

  /**
   *
   *
   * @type {*}
   * @memberof HttpService
   */
  fileData: any;

  /**
   *
   *
   * @type {string}
   * @memberof HttpService
   */
  file404: string = `

  # 404 Error

  Note:


  Either the Network connection is down
   OR 
  The file you were trying to find did not exist or escaped an unknown error.
  Please request the owner to raise a github issue with the following information:


  * Right click on the browser window.
  * Click 'Inspect'.
  * Go to the Console tab.
  * Copy all the console text or preferably take a print screen of the console.
  * Attach the print screen image and provide the URL in the browser window when this error occurred.

  `;

  constructor(
    http: HttpClient, 
    private _mhSrv: MarkdownService, 
    private _wksrv: WorkerService,
    public _r: Router
  ) {
    this.http = http;
  }

  getUrl(urlstring: string) {
    if (urlstring === '' || !urlstring) {
      urlstring = 'home';
    }
    this._mhSrv.getSource('assets/docs/' + urlstring + '.' + this.fileType).subscribe((data) => {

      console.log('DEBUG: RouteEvent Log area GetURL');
      this.fileData = data;
      this.landingPage = false;

    }, (errors) => {

      console.log('DEBUG:E: RouteEvent Log area GetURL', errors);
      this.fileData = this.file404;
      this.landingPage = false;

    })
  }

  /**
   * Prune Nav objects to get urls
   * 
   * @param {any} obj (nav objects merge structure for type : todo)
   * @returns {any[]} 
   * @memberof MenubarComponent
   */
  getLinksList(obj: any): any[] {
    let arr = [],
      linkArr = (obj instanceof Array) ? obj : (typeof obj === 'object') ? obj.nav ? obj.nav : [] : [],
      socialArr = (obj instanceof Array) ? [] : (typeof obj === 'object') ? obj.social ? obj.social : [] : [];

    for (let i = 0; i < linkArr.length; i++) {
      if (!!linkArr[i].link &&
        !linkArr[i].link.includes('http') &&
        arr.indexOf(linkArr[i].link) === -1 &&
        !linkArr[i].children &&
        linkArr[i].type !== 'external') {

        arr.push(linkArr[i].link);

      }
      if (!!linkArr[i].children) {
        for (let j = 0; j < linkArr[i].children.length; j++) {
          if (!!linkArr[i].children[j].link &&
            !linkArr[i].children[j].link.includes('http') &&
            arr.indexOf(linkArr[i].children[j].link) === -1 &&
            linkArr[i].children[j].type !== 'external') {

            arr.push(linkArr[i].children[j].link);

          }
        }
      }
    }

    if (socialArr.length > 0) {
      for (let j = 0; j < socialArr.length; j++) {
        if (!!socialArr[j].link &&
          !socialArr[j].link.includes('http') &&
          (arr.indexOf(socialArr[j].link) === -1) &&
          socialArr[j].type !== 'external') {

          arr.push(socialArr[j].link);

        }
      }
    }

    return arr;
  }

  /**
   * 
   * 
   * @param {any[]} array 
   * @returns {any[]} 
   * @memberof HttpService
   */
  arrayUnique(array: any[]): any[] {

    let a = array.concat();
    for (let i = 0; i < a.length; ++i) {
      for (let j = i + 1; j < a.length; ++j) {
        if (a[i] === a[j]) {
          a.splice(j--, 1);
        }
      }
    }
    return a;

  }

  searchdocs() {
    this._wksrv.postMessage({
      action: 'search',
      key: this.searchFormValue.search,
      type: this.searchFormValue.type,
      urls: this.searchUrlList
    });
    this.routeMe('/?search=' + this.searchFormValue.search);
  }

  routeMe(url: string) {
    this._r.navigateByUrl(url);
  }

  /**
   * Trigger routeme event (choose better name!)
   * Gets the topnav, sidebar, and footer
   *
   * @param {string} settingsSource
   * @memberof HttpService
   */
  getSettings(settingsSource: string): void {

    this.httpReq(settingsSource, 'GET', null, null)
      .subscribe(function (data) {

        /* Apply file type from settings file */
        this.fileType = data.filetype ? data.filetype : 'md';

        /* Topnav item settings */
        this.brandicon = data.topnav.logo ? data.topnav.logo : '';
        this.topnavItems = data.topnav.nav ? data.topnav.nav : [];
        this.brandname = data.topnav.brandname ? data.topnav.brandname : '';
        this.topnav = data.topnav;

        /* Sidebar Items settings */
        this.sidebarItems = data.sidebar.nav ? data.sidebar.nav : [];
        this.sidebarnav = data.sidebar;

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
        this.footerItems.nav = data.footer.nav ? data.footer.nav : [];
        this.footerItems.social = data.footer.social ? data.footer.social : [];
        this.footernav = data.footer;

        /* Home page settings */
        this.homePage = data.home;

        if (this.homePage.type === 'landing') {
          // This is creating an issue where search url load is enabling the landingPage before the search results
          //this.landingPage = true;
        }

        /* Search settings */
        this.searchSettings = data.search;
        
        if (!this.searchUrlList.length) {
          this.searchUrlList = this.searchUrlList.concat(this.getLinksList(this.topnavItems));
          this.searchUrlList = this.searchUrlList.concat(this.getLinksList(this.sidebarItems));
          this.searchUrlList = this.searchUrlList.concat(this.getLinksList(this.footerItems));
          this.searchUrlList = this.arrayUnique(this.searchUrlList);
        }

        if (!!this.fileUrl.includes('?search=')) { 
          this.searchdocs(); 
        }

        this._wksrv.searchResultEvent.subscribe(function(data) {
          if (!!this._wksrv.searchResult) {
            this.searchResults = true;
          }
        }.bind(this))

      }.bind(this), (e: any) => {
        console.log(`
          Http Get Request error from settings.json.
          Check if the name is right or if the path is right in the respective config file.
          Filenames are case sensitive.
      `, e);
      });

  }

  /**
   * Https Trigger for getting .json configs
   * 
   * @param {string} url 
   * @param {string} method 
   * @param {*} data 
   * @param {Headers} header 
   * @returns Observable object
   * @memberof HttpService
   */
  httpReq(url: string, method: string, data: any, header: (HttpHeaders | null)): any {

    let headers = new HttpHeaders();

    // TODO : Loop through passed headers, currently ignored
    headers.set('Content-Type', 'application/json');

    return this.http.request(method, url, {
      responseType: 'json',
      body: data,
      headers: headers
    }).pipe(
      map(res => res)
    );
  }

}
