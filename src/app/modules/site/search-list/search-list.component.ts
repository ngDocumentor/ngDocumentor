import { Component, OnInit } from '@angular/core';
import { SearchResult } from '../../../commons/interfaces/search/search';
import { WorkerService } from '../../../commons/services/worker/worker.service';
import { HttpService } from '../../../commons/services/http/http.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent {

  /**
   *
   *
   * @type {SearchResult}
   * @memberof SearchListComponent
   */
  searchResult: SearchResult;

  constructor(public _wksrv: WorkerService, public _h: HttpService) { }

  /**
   * Returns object keys as an array for looping
   * 
   * @param {any} obj 
   * @returns {any[]} 
   * @memberof SearchListComponent
   */
  objectKeys(obj: any): any[] {
    return Object.keys(obj);
  }

  /**
   * Returns an array as a string
   * 
   * @param {any} obj 
   * @returns {string} 
   * @memberof SearchListComponent
   */
  stringifyArray(obj: any): string {
    return JSON.stringify(obj);
  }

}
