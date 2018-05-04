import {MarkdownToHtmlService} from 'ng2-markdown-to-html';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Request, RequestMethod, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {

  http: Http;

  oldHash: string;

  fileUrl: string;

  fileData: any;

  file404: string = `
  # 404 Error

  Note: The file you were trying to find did not exist or escaped an unknown error.
  `;

  routeme: EventEmitter<string>;

  constructor(http: Http, private _mhSrv: MarkdownToHtmlService) {

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

  httpReq(url: string, method: string, data: any, header: Headers) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (method === 'GET') { var methods = RequestMethod.Get }
    else if (method === 'POST') { var methods = RequestMethod.Post }
    else if (method === 'PUT') { var methods = RequestMethod.Put }
    else if (method === 'PATCH') { var methods = RequestMethod.Patch }
    else if (method === 'DELETE') { var methods = RequestMethod.Delete }
    else { var methods = RequestMethod.Get };

    return this.http.request(new Request({
      method: methods,
      url: url,
      body: JSON.stringify(data),
      headers: headers
    })).map(res => res.json());
  }

}
