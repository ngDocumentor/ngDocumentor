import { Component } from '@angular/core';
import { HttpService } from '../../../commons/services/http/http.service';

@Component({
  selector: 'app-highlight-main',
  templateUrl: './highlight-main.component.html',
  styleUrls: ['./highlight-main.component.css']
})
export class HighlightMainComponent {

  constructor(public _h: HttpService) { }

}
