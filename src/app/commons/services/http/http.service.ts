import { MarkdownService } from 'ngx-markdown';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Request, RequestMethod, Headers } from '@angular/http';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';



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

  constructor(http: HttpClient, private _mhSrv: MarkdownService) {

    this.http = http;

    this.routeme = new EventEmitter();
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
      let url = linkData.url, host = linkData.host;

      console.log('DEBUG: routeUrl', url, host);

      if ((url && (url.includes('http') && !url.includes(host))) || (url == '' || url === '/')) {
        console.log('DEBUG: RouteEvent Log area one');
        that.getHomeUrl();
      }

      if (url.includes(host)) {
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
