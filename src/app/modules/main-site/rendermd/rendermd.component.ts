import { Component } from '@angular/core';
import { HttpService } from '../../../commons/services/http/http.service';
import { WorkerService } from '../../../commons/services/worker/worker.service';

@Component({
  selector: 'app-rendermd',
  templateUrl: './rendermd.component.html',
  styleUrls: ['./rendermd.component.css']
})
export class RendermdComponent {

  constructor(public _h: HttpService, public _wksrv: WorkerService) {}

}
