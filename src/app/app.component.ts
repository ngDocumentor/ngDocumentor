import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from './commons/services/http/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  /**
   *
   *
   * @type {string}
   * @memberof AppComponent
   */
  @Input('settingsSource') settingsSource: string;

  constructor(
    public _h: HttpService
    ) {  }

  /**
   * Init gets:
   * Window location url into service
   * 
   * @memberof AppComponent
   */
  ngOnInit(): void {
    this._h.fileUrl = window.location.href;
    if (!!this.settingsSource) {
      this._h.settingsSource = this.settingsSource;
    }
    this._h.getSettings(this._h.settingsSource);
    
  }

}
