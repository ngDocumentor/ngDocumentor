import { Injectable, EventEmitter } from '@angular/core';
import { SearchResult, SearchRequest } from '../../interfaces/search/search';


@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  searchWorker: any;

  searchResult: SearchResult[] | null = null;

  searchResultEvt: EventEmitter<any>;

  constructor() {
    this.searchInit('/assets/scripts/search-worker.js');
    this.onmessage();
    this.searchResultEvt = new EventEmitter();
  }

  postMessage(data: SearchRequest): void {
    this.searchWorker.postMessage(data);
  }

  searchInit(fileUrl: string): void {
    this.searchWorker = new Worker(fileUrl);
  }

  onmessage(): void {
    let that = this;
    this.searchWorker.onmessage = function (data: any) {
      that.searchResult = data.data.result;
      console.log('Search Data', that.searchResult);
      that.searchResultEvt.emit({action: data.data.action, data: that.searchResult});
    };
  }

  terminate(): void {
    this.searchWorker.terminate();
  }

}
