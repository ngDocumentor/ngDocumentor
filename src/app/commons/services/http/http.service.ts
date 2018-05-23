import { MarkdownService } from 'ngx-markdown';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Request, RequestMethod, Headers } from '@angular/http';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { WorkerService } from '../worker/worker.service';



@Injectable()
export class HttpService {

  http: HttpClient;

  fileUrl: string;

  bmarkUri: string;

  fileData: any;

  file404: string = `

  # 404 Error

  Note:


  The file you were trying to find did not exist or escaped an unknown error.
  Please request the owner to raise a github issue with the following information:


  * Right click on the browser window.
  * Click 'Inspect'.
  * Go to the Console tab.
  * Copy all the console text or preferably take a print screen of the console.
  * Attach the print screen image and provide the URL in the browser window when this error occurred.

  `;

  routeme: EventEmitter<{ url: string; host: string; }>;

  constructor(http: HttpClient, private _mhSrv: MarkdownService, private _wksrv: WorkerService) {

    this.http = http;

    this.routeme = new EventEmitter();
  }

  // TODO: INCOMPLETE Tests to be added
  cleanUrl(url, host): { routeUri, bmarkUri } {
    let that = this, routeUri = '', bmarkUri = '';
    if (url.includes(host)) {
      url = url.split(host + '/')[1];
    }
    if (url) {
      if (!url.includes('http')) {
        if (url.indexOf('/') === 0 && url.split('/').length >= 1) {
          // /loc, /loc#bmark,
          // /#loc#bmark?, /##loc#bmark
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
          // #/loc, #/loc#bmark, #/#loc#bmark?,
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

  getHomeUrl() {
    let that = this;
    that._mhSrv.getSource('assets/mddocs/' + 'home.md').subscribe((data) => {

      console.log('DEBUG: RouteEvent Log area seven');

      that.fileData = data;
    }, (errors) => {

      console.log('DEBUG:E: RouteEvent Log area eight', errors);

      that.fileData = that.file404;
    });
  }

  getRouteEvent() {
    let that = this;
    this.routeme.subscribe((linkData) => {
      let url = linkData.url, host = linkData.host, search = '';

      console.log('DEBUG: routeUrl', url, host);

      if (url.includes('#/#/?search=')) {
        search = url.split('#/#/?search=')[1];
        url = 'http';
        if (search && search !== '') {
          that._wksrv.postMessage({
            action: 'search',
            key: search,
            urls: ['/assets/mddocs/home.m', '/assets/mddocs/credits.md', '/assets/mddocs/intro.md']
          });
        }
        return;
      }

      if ((url && (url.includes('http') && !url.includes(host))) || (url === '' || url === '/')) {
        console.log('DEBUG: RouteEvent Log area one');
        that.getHomeUrl();
      }

      if (url.includes(host)) {
        if (url.split(host + '/').length >= 2) {
          url = url.split(host + '/')[1];
          console.log('route url', url);

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
          console.log('DEBUG:E: RouteEvent Log area five', error);
          that.fileData = that.file404;
        });
      } else {
        console.log('DEBUG:E: RouteEvent Log area six');
        that.getHomeUrl();
      }
    });
  }

  // Not needed but keeping this for any usecase later. Dead code
  httpReq(url: string, method: string, data: any, header: Headers) {
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
