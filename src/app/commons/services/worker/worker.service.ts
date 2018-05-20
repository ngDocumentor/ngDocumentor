import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  searchWorker: any;

  searchData: any | null = null;

  constructor() {
    this.searchInit('/assets/scripts/search-worker.js');
    this.onmessage();
  }

  postMessage(data: any): void {
    this.searchWorker.postMessage(data);
  }

  searchInit(fileUrl: string): void {
    this.searchWorker = new Worker(fileUrl);
  }

  onmessage(): void {
    let that = this;
    this.searchWorker.onmessage = function (data) {
      this.searchData = data;
    };
  }

  terminate(): void {
    this.searchWorker.terminate();
  }
}
