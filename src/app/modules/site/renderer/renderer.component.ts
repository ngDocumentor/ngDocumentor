import { Component } from '@angular/core';
import { HttpService } from '../../../commons/services/http/http.service';
import { WorkerService } from '../../../commons/services/worker/worker.service';

@Component({
  selector: 'app-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.css']
})
export class RendererComponent {

  constructor(public _h: HttpService, public _wksrv: WorkerService) {}

}
