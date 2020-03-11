import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../../commons/services/worker/worker.service';
import { HttpService } from '../../commons/services/http/http.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  constructor(
    public _wksrv: WorkerService,
    public _h: HttpService
  ) { }

  ngOnInit() {
  }

}
