import { MarkdownService } from 'ngx-markdown';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Request, RequestMethod, Headers } from '@angular/http';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { WorkerService } from '../worker/worker.service';

// Interfaces for structure check. Options are becoming complex.
import { Menu, MenuLinks } from '../../../commons/interfaces/menu/menu';
import { Sidebar, SidebarLinks, SidebarParentLinks } from '../../../commons/interfaces/sidebar/sidebar';
import { Footer } from '../../../commons/interfaces/footer/footer';


@Injectable()
export class HttpService {

  http: HttpClient;

  fileUrl: string;

  bmarkUri: string;

  fileData: any;

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

  routeme: EventEmitter<{ url: string; host: string; }>;

  topnav: any;

  sidebarnav: any;

  footernav: any;

  settingsSrc: string = 'assets/config/settings.json';

  topnavItems: MenuLinks[] = [];

  brandname: string = '';

  brandicon: string = '';

  sidebarItems: (SidebarLinks | SidebarParentLinks)[] = [];

  footerItems: Footer = { copyright: { tag: '', text: '', link: '/home', type: 'internal' }, nav: [], social: [] };

  domLoaded: boolean = false;

  homePage: any;

  landingPage: boolean = false;

  searchValue: string = '';

  searchSettings: any;

  searchUrlList: string[] = [];

  constructor(http: HttpClient, private _mhSrv: MarkdownService, private _wksrv: WorkerService) {

    this.http = http;

    this.routeme = new EventEmitter();
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
      if (!!linkArr[i].link && !linkArr[i].link.includes('http') && arr.indexOf(linkArr[i].link) === -1 && !linkArr[i].children && linkArr[i].type !== 'external') {
        arr.push(linkArr[i].link);
      }
      if (!!linkArr[i].children) {
        for (let j = 0; j < linkArr[i].children.length; j++) {
          if (!!linkArr[i].children[j].link && !linkArr[i].children[j].link.includes('http') && arr.indexOf(linkArr[i].children[j].link) === -1 && linkArr[i].children[j].type !== 'external') {
            arr.push(linkArr[i].children[j].link);
          }
        }
      }
    }

    if (socialArr.length > 0) {
      for (let j = 0; j < socialArr.length; j++) {
        if (!!socialArr[j].link && !socialArr[j].link.includes('http') && (arr.indexOf(socialArr[j].link) === -1) && socialArr[j].type !== 'external') {
          arr.push(socialArr[j].link);
        }
      }
    }

    return arr;
  }

  /**
   * TODO: INCOMPLETE Tests to be added
   * 
   * @param {any} url 
   * @param {any} host 
   * @returns {{ routeUri, bmarkUri }} 
   * @memberof HttpService
   */
  cleanUrl(url: string, host: string): { routeUri, bmarkUri } {
    let that = this, routeUri = '', bmarkUri = '';
    if (url.includes(host)) {
      url = url.split(host + '/')[1];
    }
    if (url) {
      if (!url.includes('http')) {
        if (url.indexOf('/') === 0 && url.split('/').length >= 1) {
          // /loc, /loc#bmark,
          // /#loc#bmark, /##loc#bmark
          let tmpUriArr = url.split('/');
          if (tmpUriArr[1].split('#').length >= 2) {
            routeUri = tmpUriArr[1].split('#')[0];
            bmarkUri = tmpUriArr[1].split('#')[1];
          } else {
            routeUri = tmpUriArr[1].split('#')[0];
            bmarkUri = '';
          }
        }
        if (url.indexOf('#') === 0) {
          // #/loc, #/loc#bmark, #/#loc#bmark,
          let tmpUriArr = url.split('#');
          if (tmpUriArr[1].indexOf('/') === 0) {
            routeUri = tmpUriArr[1].split('/')[1];
            if (tmpUriArr.length > 2) {
              bmarkUri = tmpUriArr[2];
            } else {
              bmarkUri = '';
            }
          }

          if (tmpUriArr[1].indexOf('/') !== 0) {
            // ##/loc#bmark, ##/#loc#bmark
            // ##loc, ##loc#bmark
            if (tmpUriArr[1] === '' && tmpUriArr.length > 2) {
              routeUri = '';
              bmarkUri = tmpUriArr[2];
            }
            // #
            if (tmpUriArr[1] === '' && tmpUriArr.length === 2) {
              routeUri = '';
              bmarkUri = '';
            }
            // #loc#bmark
            if (tmpUriArr[1] !== '' && tmpUriArr.length > 2) {
              routeUri = tmpUriArr[1];
              bmarkUri = tmpUriArr[2];
            }
            // #loc
            if (tmpUriArr[1] !== '' && tmpUriArr.length === 2) {
              routeUri = tmpUriArr[1];
              bmarkUri = '';
            }
          }
        }
        if (url.indexOf('/') !== 0 && url.indexOf('#') !== 0) {
          // loc, loc#bmark
          let tmpUriArr = url.split('#');
          if (tmpUriArr.length >= 2) {
            routeUri = tmpUriArr[0];
            bmarkUri = tmpUriArr[1];
          } else {
            routeUri = tmpUriArr[0];
            bmarkUri = '';
          }
        }
      }
    }

    console.log('DEBUG: CleanUrl', { routeUri: routeUri, bmarkUri: bmarkUri });
    return {
      routeUri: routeUri,
      bmarkUri: bmarkUri
    };
  }

  /**
   * Gets the home.md file and assigns
   * If homepage type is 'landing', will get the landing view
   * Else if the homepage type is 'text', will show home.md view
   * If no home.md present, 404 error is assigned
   * 
   * @memberof HttpService
   */
  getHomeUrl(): void {
    let that = this;
    if (!!this.homePage && this.homePage.type === 'landing') {

      this.fileData = null;
      this.landingPage = true;

    } else if (this.homePage.type === 'text') {

      let url;
      if (!!this.homePage.url) {
        url = this.homePage.url ? this.homePage.url : '';
      }
      if (url !== '' && url !== '#' && url !== '#/') {
        that._mhSrv.getSource('assets/mddocs/' + url.split('/')[1] + '.md').subscribe((data) => {

          console.log('DEBUG: RouteEvent Log area seven');
          that.fileData = data;
          that.landingPage = false;
        }, (errors) => {

          console.log('DEBUG:E: RouteEvent Log area eight', errors);
          that.fileData = that.file404;
          that.landingPage = false;
        });
      } else {
        this.fileData = this.file404;
        that.landingPage = false;
      }

    } else {

      this.fileData = this.file404;
      that.landingPage = false;

    }
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
  /**
   * Function to initiate routeme listener/subscriber
   * 
   * @memberof HttpService
   */
  getRouteEvent(): void {
    let that = this;
    this.routeme.subscribe(async function (linkData) {
      let url = linkData.url, host = linkData.host, search = '';

      console.log('DEBUG: routeUrl getRouteEvent ', url, host);

      /* If http is included but host is not in the url and url is blank or / */
      if ((url && (url.includes('http') && !url.includes(host))) || (url === '' || url === '/' || url === '#' || url === '#/') && (!url.includes('#/#/?search='))) {
        console.log('DEBUG: RouteEvent Log area one');
        that.getHomeUrl();
      }

      /* If http and host is included */
      if (url.includes(host) && (!url.includes('#/#/?search='))) {
        if (url.split(host + '/').length >= 2) {
          url = url.split(host + '/')[1];

          if (url !== '' && url !== '#' && url !== '#/') {
            if (url.split('#/').length >= 2) {
              url = url.split('#/')[1];
            }
            if (url.indexOf('#') === 0) {

            } else {
              if (url.split('#').length >= 2) {
                url = url.split('#')[0];
              }
            }
          }
          if (url === '' && url === '#' && url === '#/') {
            that.getHomeUrl();
          }
        }
      }

      console.log('DEBUG: routeUrl Two', url, host);

      /* If url is valid but doesnot include http and is file name */
      if ((!url.includes('#/#/?search='))) {
        if (!!url && !url.includes('http') && url !== '' && url !== '#' && url !== '#/') {
          that._mhSrv.getSource('assets/mddocs/' + url + '.md').subscribe((data) => {
            console.log('DEBUG: RouteEvent Log area two');
            if (data.includes('<!doctype html>')) {
              console.log('DEBUG:E: RouteEvent Log area three');
              that.fileData = that.file404;
              that.landingPage = false;
            } else {
              console.log('DEBUG: RouteEvent Log area four');
              that.fileData = data;
              that.landingPage = false;
            }
          }, (error) => {
            /* If url filename has error or unhandled condition */
            console.log('DEBUG:E: RouteEvent Log area five', error);
            that.fileData = that.file404;
            that.landingPage = false;
          });
        } else {
          /* If url is not valid or includes http */
          console.log('DEBUG:E: RouteEvent Log area six');
          that.getHomeUrl();
        }
      }
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
  httpReq(url: string, method: string, data: any, header: Headers): any {
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
