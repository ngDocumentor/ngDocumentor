import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarkdownToHtmlService } from 'ng2-markdown-to-html';

@Component({
  selector: 'app-rendermd',
  templateUrl: './rendermd.component.html',
  styleUrls: ['./rendermd.component.css']
})
export class RendermdComponent implements OnInit {

  fileUrl: string = '';

  fileData: any;

  constructor(private _ar: ActivatedRoute, private _rtr: Router, private _mhSrv: MarkdownToHtmlService) {

  }

  ngOnInit() {
    let that = this;
    this._ar.url.subscribe((url) => {
      let uri;
      if (!url.join('/') || url.join('/') === '' || url.join('/') === '/') {
        uri = 'home';
      } else {
        uri = url.join('/');
      }
      that._mhSrv.getSource('assets/mddocs/' + uri + '.md').subscribe((data) => {
        console.log('Log area one');
        if (data.includes('<!doctype html>')) {
          that.fileData = `
          # 404 Error

          Note: The file you were trying to find did not exist or escaped an unknown error.
          `;
        } else {
          that.fileData = data;
        }
      }, (error) => {
        that._mhSrv.getSource('assets/mddocs/' + 'home.md').subscribe((data) => {
          console.log('Log area two');
          that.fileData = data;
        }, (error) => {
          console.log('Log area three');
          that.fileData = `
          # 404 Error

          Note: The file you were trying to find did not exist or escaped an unknown error.
          `
        });
      });

      // Removing this until the error event is created
      //that.fileUrl = '/assets/mddocs/' + url.join('/') + '.md';
    });

  }

}
