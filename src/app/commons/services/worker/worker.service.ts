import { Injectable } from '@angular/core';
import { LViewNode } from '@angular/core/src/render3/interfaces/node';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  searchWorker: any;

  constructor() {
    // Comment out the following after implementation
    this.init('/assets/scripts/search-worker.js');

    this.onmessage();

    // Comment out the following after implementation
    this.postMessage('Test from web worker srv');
  }

  postMessage(data: any): void {
    this.searchWorker.postMessage(data);
  }

  init(fileUrl: string): void {
    this.searchWorker = new Worker(fileUrl);
  }

  onmessage(): void {
    let that = this;
    this.searchWorker.onmessage = function (data) {
      console.log(data);
    };
  }

  terminate(): void {
    this.searchWorker.terminate();
  }
}
