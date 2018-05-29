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

  searchUrlList: string[] = [];

  sidebarSrc: string = 'assets/config/sidebar.json';

  topnavSrc: string = 'assets/config/topnav.json';

  footerSrc: string = 'assets/config/footer.json';

  topnavItems: MenuLinks[] = [];

  brandname: string = '';

  sidebarItems: (SidebarLinks | SidebarParentLinks)[] = [];

  footerItems: Footer = { copyright: { tag: '', text: '', link: '/home', type: 'internal' }, nav: [], social: [] };

  constructor(http: HttpClient, private _mhSrv: MarkdownService, private _wksrv: WorkerService) {

    this.http = http;

    this.routeme = new EventEmitter();
  }

  /**
   * Prune Nav objects to get urls
   * 
   * @param {any} obj 
   * @returns {any[]} 
   * @memberof MenubarComponent
   */
  getLinksList(obj): any[] {
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
  cleanUrl(url, host): { routeUri, bmarkUri } {
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
   * If no home.md present 404 error is assigned
   * 
   * @memberof HttpService
   */
  getHomeUrl(): void {
    let that = this;
    that._mhSrv.getSource('assets/mddocs/' + 'home.md').subscribe((data) => {

      console.log('DEBUG: RouteEvent Log area seven');

      that.fileData = data;
    }, (errors) => {

      console.log('DEBUG:E: RouteEvent Log area eight', errors);

      that.fileData = that.file404;
    });
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

      /* If the load is a search event. TODO: Fails for reload */
      if (url.includes('#/#/?search=') && !!that.topnav && !!that.sidebarnav && !!that.footernav) {
        search = url.split('#/#/?search=')[1];
        url = 'http';
        if (!!search && search !== '') {
          if (!that.searchUrlList.length && that.topnav && that.sidebarnav && that.footernav) {
            that.searchUrlList.concat(that.getLinksList(that.topnav));
            that.searchUrlList.concat(that.getLinksList(that.sidebarnav));
            that.searchUrlList.concat(that.getLinksList(that.footernav));
          }
        }
        return;
      }

      /* If http is included but host is not in the url and url is blank or / */
      if ((url && (url.includes('http') && !url.includes(host))) || (url === '' || url === '/') && (!url.includes('#/#/?search='))) {
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
        if (url && !url.includes('http')) {
          that._mhSrv.getSource('assets/mddocs/' + url + '.md').subscribe((data) => {
            console.log('DEBUG: RouteEvent Log area two');
            if (data.includes('<!doctype html>')) {
              console.log('DEBUG:E: RouteEvent Log area three');
              that.fileData = that.file404;
            } else {
              console.log('DEBUG: RouteEvent Log area four');
              that.fileData = data;
            }
          }, (error) => {
            /* If url filename has error or unhandled condition */
            console.log('DEBUG:E: RouteEvent Log area five', error);
            that.fileData = that.file404;
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
