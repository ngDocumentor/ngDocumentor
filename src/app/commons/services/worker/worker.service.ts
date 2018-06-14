import { Injectable } from '@angular/core';
import { SearchResult, SearchRequest } from '../../interfaces/search/search';


@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  searchWorker: any;

  searchResult: SearchResult[] | null = null;

  constructor() {
    this.searchInit('/assets/scripts/search-worker.js');
    this.onmessage();
  }

  /**
   * Post message to worker function.
   * Another using from inside of HttpService and One from menubar.component
   * 
   * @param {SearchRequest} data 
   * @memberof WorkerService
   */
  postMessage(data: SearchRequest): void {
    this.searchWorker.postMessage(data);
  }

  /**
   * Initialize search worker
   * 
   * @param {string} fileUrl 
   * @memberof WorkerService
   */
  searchInit(fileUrl: string): void {
    this.searchWorker = new Worker(fileUrl);
  }

  /**
   * Function to trigger onmessage listener
   * 
   * @memberof WorkerService
   */
  onmessage(): void {
    let that = this;
    this.searchWorker.onmessage = function (data: any) {
      that.searchResult = data.data.result;
      console.log('DEBUG: Search Data WorkerService', that.searchResult);
    };
  }

  /**
   * Terminate the worker
   * It is not used since the worker is kept alive 
   * Only one single worker is used using service workers
   * 
   * @memberof WorkerService
   */
  terminate(): void {
    this.searchWorker.terminate();
  }

}
