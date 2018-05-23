import { Component, OnInit } from '@angular/core';
import { SearchResult } from '../../../commons/interfaces/search/search';
import { WorkerService } from '../../../commons/services/worker/worker.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  searchResult: SearchResult;

  constructor(private _wksrv: WorkerService) {}

  ngOnInit() {}

}
