import { Injectable } from '@angular/core';
import { SearchResult, SearchRequest } from '../../interfaces/search/search';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  searchWorker: any;

  searchResult: SearchResult | null = null;

  constructor() {
    this.searchInit('/assets/scripts/search-worker.js');
    this.onmessage();
  }

  postMessage(data: SearchRequest): void {
    this.searchWorker.postMessage(data);
  }

  searchInit(fileUrl: string): void {
    this.searchWorker = new Worker(fileUrl);
  }

  onmessage(): void {
    let that = this;
    this.searchWorker.onmessage = function (data: SearchResult) {
      this.searchResult = data;
    };
  }

  terminate(): void {
    this.searchWorker.terminate();
  }
}
