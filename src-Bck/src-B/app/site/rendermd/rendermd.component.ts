import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../../commons/services/worker/worker.service';
import { HttpService } from '../../commons/services/http/http.service';

@Component({
  selector: 'app-rendermd',
  templateUrl: './rendermd.component.html',
  styleUrls: ['./rendermd.component.css']
})
export class RendermdComponent implements OnInit {

  constructor(public _h: HttpService, public _wksrv: WorkerService) { }

  ngOnInit() {
  }

}
