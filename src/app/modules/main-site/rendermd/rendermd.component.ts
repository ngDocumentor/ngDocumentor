import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarkdownToHtmlService } from 'ng2-markdown-to-html';
import { HttpService } from '../../../commons/services/http/http.service';

@Component({
  selector: 'app-rendermd',
  templateUrl: './rendermd.component.html',
  styleUrls: ['./rendermd.component.css']
})
export class RendermdComponent implements OnInit {

  constructor(public _h: HttpService) {}

  ngOnInit() {}

}
