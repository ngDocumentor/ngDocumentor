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

  constructor(public _wksrv: WorkerService) {}

  /**
   * Returns object keys as an array for looping
   * 
   * @param {any} obj 
   * @returns {any[]} 
   * @memberof SearchListComponent
   */
  objectKeys(obj): any[] {
    return Object.keys(obj);
  }

  /**
   * Returns an array as a string
   * 
   * @param {any} obj 
   * @returns {string} 
   * @memberof SearchListComponent
   */
  stringifyArray(obj): string {
    return JSON.stringify(obj);
  }

  ngOnInit() {}

}
