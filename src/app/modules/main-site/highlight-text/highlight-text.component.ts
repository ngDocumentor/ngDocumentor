import { Component } from '@angular/core';
import { HttpService } from '../../../commons/services/http/http.service';

@Component({
  selector: 'app-highlight-text',
  templateUrl: './highlight-text.component.html',
  styleUrls: ['./highlight-text.component.css']
})
export class HighlightTextComponent {

  constructor(public _h: HttpService) { }

}
