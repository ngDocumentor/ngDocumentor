import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarkdownService } from 'ngx-markdown';
import { HttpService } from '../../../commons/services/http/http.service';
import { WorkerService } from '../../../commons/services/worker/worker.service';
import { SearchResult } from '../../../commons/interfaces/search/search';

@Component({
  selector: 'app-rendermd',
  templateUrl: './rendermd.component.html',
  styleUrls: ['./rendermd.component.css']
})
export class RendermdComponent {

  constructor(public _h: HttpService, private _wksrv: WorkerService) {}

}
