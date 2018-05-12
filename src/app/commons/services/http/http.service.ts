import { MarkdownService } from 'ngx-markdown';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Request, RequestMethod, Headers } from '@angular/http';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable()
export class HttpService {

  http: HttpClient;

  fileUrl: string;

  fileData: any;

  file404: string = `
  # 404 Error

  Note: The file you were trying to find did not exist or escaped an unknown error.
  `;

  routeme: EventEmitter<string>;

  constructor(http: HttpClient, private _mhSrv: MarkdownService) {

    this.http = http;

    this.routeme = new EventEmitter();
  }

  getRouteEvent() {
    let that = this;
    this.routeme.subscribe((url) => {

      let uri;
      // Bug is that bookmarks now wont work due to hash listener
      // Handle the bookmark inside page url as well
      let tmpUri = url.split('#')[1] ? url.split('#')[1].split('/') : [];
      //console.log('DEBUG: tmpUri', tmpUri);
      if ((!tmpUri) || (tmpUri.length <= 1) || (tmpUri[1] == '')) {
        uri = '/home';
      } else {
        console.log('DEBUG: uri arrays', url.split('#').splice(1, 1), url.split('#'));
        uri = url.split('#').splice(1, 1);
      }
      that._mhSrv.getSource('assets/mddocs' + uri + '.md').subscribe((data) => {
        console.log('DEBUG: Log area one');
        if (data.includes('<!doctype html>')) {
          that.fileData = that.file404;
        } else {
          that.fileData = data;
        }
      }, (error) => {
        that._mhSrv.getSource('assets/mddocs/' + 'home.md').subscribe((data) => {
          console.log('DEBUG: Log area two');
          that.fileData = data;
        }, (errors) => {
          console.log('DEBUG: Log area three');
          that.fileData = that.file404;
        });
      });

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
