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
      that._mhSrv.getSource('/assets/mddocs/' + url.join('/') + '.md').subscribe((data) => {
        that.fileData = data;
      }, (error) => {
        that._mhSrv.getSource('/assets/mddocs/' + 'intro.md').subscribe((data) => {
          that.fileData = data;
        });
      });

      // Removing this until the error event is created
      //that.fileUrl = '/assets/mddocs/' + url.join('/') + '.md';
    });

  }

}
