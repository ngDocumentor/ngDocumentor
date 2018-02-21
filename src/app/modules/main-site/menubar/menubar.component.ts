import { Component, Input, Output, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var gnMenu;

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  @ViewChild('sidebarfixed') sidebarfixed: ElementRef;

  @ViewChild('topnav') topnav: ElementRef;

  @ViewChild('contentmain') contentmain: ElementRef;

  @Input('brandname') brandname: string;

  @Input('sidebartype') sidebartype: string = 'non-blocking';

  @Input('sidebarItems') sidebarItems: any[] = [];

  @Input('topnavItems') topnavItems: any[] = [];

  sidebarclosed: boolean = true;

  styleList: any[] = [];

  accordianClassList: any[] = [];

  menuclosed: boolean = true;

  constructor(private _rtr: Router) {

  }

  openNav() {
    this.sidebarclosed = false;
    this.sidebarfixed.nativeElement.style.width = '250px';
    this.topnav.nativeElement.style.left = '250px';
    this.contentmain.nativeElement.style.marginLeft = '250px';
    return false;
  }

  closeNav() {
    this.sidebarclosed = true;
    this.sidebarfixed.nativeElement.style.width = '0';
    this.topnav.nativeElement.style.left = '0';
    this.contentmain.nativeElement.style.marginLeft = '0px';
    return false;
  }

  routeMain() {
    this._rtr.navigateByUrl('/');
  }

  routeTopnav(event: any, obj: any) {
    if (!!obj.link) {
      if (obj.type === 'external') {
        event.target.target = '_blank';
        window.location.href = obj.link;
      } else {
        event.target.target = '_self';
        this._rtr.navigateByUrl(obj.link);
      }
    } else {
      event.target.target = '_self';
      this._rtr.navigateByUrl('/docs');
    }
    return false;
  }

  openItems(event: any, i: number) {
    if (this.accordianClassList[i]['active-sidebar'] == true) {
      this.accordianClassList[i] = {'accordion': true, 'active-sidebar': false};
    } else {
      this.accordianClassList[i] = {'accordion': true, 'active-sidebar': true};
    }
    if (this.styleList[i]['display'] == 'block' ) {
      this.styleList[i] = { 'display': 'none' };
    } else {
      this.styleList[i] = { 'display': 'block' };
    }
  }

  addEventListenersAccordian() {
    let acc = document.getElementsByClassName('accordion');
    let i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener('click', function () {
        this.classList.toggle('active-sidebar');
        let panel = this.nextElementSibling;
        if (panel.style.display === 'block') {
          panel.style.display = 'none';
        } else {
          panel.style.display = 'block';
        }
      });
    }
  }

  ngOnInit() {

    this.addEventListenersAccordian();

  }

}
