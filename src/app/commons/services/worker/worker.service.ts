import { Injectable } from '@angular/core';
import { LViewNode } from '@angular/core/src/render3/interfaces/node';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  searchWorker: any;

  searchData: any | null = null;

  constructor() {
    // Comment out the following after implementation
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
      console.log(this.searchData);
    };
  }

  terminate(): void {
    this.searchWorker.terminate();
  }
}
