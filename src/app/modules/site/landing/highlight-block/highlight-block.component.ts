import { Component } from '@angular/core';
import { HttpService } from '../../../../commons/services/http/http.service';

@Component({
  selector: 'app-highlight-block',
  templateUrl: './highlight-block.component.html',
  styleUrls: ['./highlight-block.component.css']
})
export class HighlightBlockComponent {
  /**
   *
   *
   * @type {*}
   * @memberof HighlightBlockComponent
   */
  blocks: any;

  constructor(public _h: HttpService) {
    this.blocks = _h.homePage.blocks;
  }

}
