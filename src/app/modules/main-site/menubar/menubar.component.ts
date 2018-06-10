import { Component, Input, Output, ViewChild, ElementRef, OnInit, AfterViewChecked } from '@angular/core';
import { HttpService } from '../../../commons/services/http/http.service';
import { WorkerService } from '../../../commons/services/worker/worker.service';

import { MenuLinks } from '../../../commons/interfaces/menu/menu';
import { SidebarLinks, SidebarParentLinks } from '../../../commons/interfaces/sidebar/sidebar';
import { Footer } from '../../../commons/interfaces/footer/footer';
import { SearchResult } from '../../../commons/interfaces/search/search';


declare var gnMenu;

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit, AfterViewChecked {

  @ViewChild('sidebarfixed') sidebarfixed: ElementRef;

  @ViewChild('topnav') topnav: ElementRef;

  @ViewChild('contentmain') contentmain: ElementRef;

  @ViewChild('footernav') footernav: ElementRef;

  @ViewChild('searchform') searchform;

  @Input('brandname') brandname: string;

  @Input('sidebartype') sidebartype: string = 'non-blocking';

  @Input('sidebarItems') sidebarItems: (SidebarLinks | SidebarParentLinks)[] = [];

  @Input('topnavItems') topnavItems: MenuLinks[] = [];

  @Input('footer') footer: Footer = { copyright: { tag: '', text: '', link: '/home', type: 'internal' }, nav: [], social: [] };

  sidebarclosed: boolean = true;

  styleList: any[] = [];

  accordianClassList: any[] = [];

  menuclosed: boolean = true;

  showsearch: boolean = false;

  searchicon: boolean = true;

  constructor(private _h: HttpService, public _wksrv: WorkerService) { }

  /**
   * Opens sidebar navigation
   * 
   * @returns {boolean} 
   * @memberof MenubarComponent
   */
  openNav(): boolean {
    this.sidebarclosed = false;
    this.sidebarfixed.nativeElement.style.width = '250px';
    this.topnav.nativeElement.style.left = '250px';
    this.contentmain.nativeElement.style.marginLeft = '250px';
    this.footernav.nativeElement.style.left = '250px';
    this.footernav.nativeElement.style.right = '0px';
    this.footernav.nativeElement.style.position = 'absolute';
    return false;
  }

  /**
   * Closes sidebar navigation 
   * 
   * @returns {boolean} 
   * @memberof MenubarComponent
   */
  closeNav(): boolean {
    this.sidebarclosed = true;
    this.sidebarfixed.nativeElement.style.width = '0';
    this.topnav.nativeElement.style.left = '0';
    this.contentmain.nativeElement.style.marginLeft = '0px';
    this.footernav.nativeElement.style.left = '0';
    this.footernav.nativeElement.style.right = '0px';
    this.footernav.nativeElement.style.position = 'absolute';
    return false;
  }

  /**
   * Check whether mobile/tablet or desktop environment
   * 
   * @returns {boolean} 
   * @memberof MenubarComponent
   */
  mobileAndTabletCheck(): boolean {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor);
    return check;
  };

  /**
   * Close navigation in Mobile
   * Init allows for opening navigation in desktop
   * 
   * @param {any} obj 
   * @memberof MenubarComponent
   */
  closeMobileNav(obj): void {
    let mobile = this.mobileAndTabletCheck();
    if (!!mobile) {
      this.closeNav();
      window.scroll(0, 0);
    }
  }

  /**
   * Routes to main route
   * 
   * @memberof MenubarComponent
   */
  routeMain(e): void {
    e.preventDefault();
    window.location.href = '#/home';
    window.scroll(0, 0);
  }

  /**
   * HashChange capture event
   * 
   * @param {any} url 
   * @returns {*} Nothing is return in any hash change event, just an event to stop further propogation
   * @memberof MenubarComponent
   */
  hashChangeFunction(url): any {
    let that = this, routeUri = '', bmarkUri = '';
    if (url) {

      /* Handles back arrow trigger for search on hash change */
      if (window.location.href.includes('#/#/?search=')) {
        that._h.routeme.emit({ url: window.location.href, host: window.location.host });
        return;
      }

      console.log('DEBUG: HashChange Init', url);

      /* Handle the cleaning of url to get the routeurl filename and bookmark associated */
      let cleaner = this._h.cleanUrl(url, window.location.host);
      routeUri = cleaner.routeUri;
      bmarkUri = cleaner.bmarkUri;

      that._h.fileUrl = routeUri;
      that._h.bmarkUri = bmarkUri;

      if (that._h.fileUrl !== window.location.host) {

        /* Handles http://external url */
        console.log('DEBUG: HashChangeURI One', routeUri, bmarkUri);
        that._h.routeme.emit({ url: routeUri, host: window.location.host });
      } else if (that._h.fileUrl === window.location.host) {

        /* Handles url which includes host */
        console.log('DEBUG: HashChangeURI Two', routeUri, bmarkUri);
        that._h.fileUrl = '';
        that._h.bmarkUri = '';
        that._h.routeme.emit({ url: '', host: window.location.host });
      } else {

        /* Handles external url change */
        console.log('DEBUG: HashChangeURI Three', routeUri, bmarkUri);
        that._h.fileUrl = '';
        that._h.bmarkUri = '';
        window.location.href = url;
      }
      window.scroll(0, 0);
      this._wksrv.searchResult = null;
      return;
    } else {

      /* Handles if no url string passed */
      console.log('DEBUG: HashChangeURI Four - Error occurred due to no url string', url);
      this._wksrv.searchResult = null;
      return;
    }
  }

  /**
   * Open specific item in the sidebar
   * 
   * @param {*} event 
   * @param {number} i 
   * @memberof MenubarComponent
   */
  openItems(event: any, i: number): void {
    if (this.accordianClassList[i]['active-sidebar'] == true) {
      this.accordianClassList[i] = { 'accordion': true, 'active-sidebar': false };
    } else {
      this.accordianClassList[i] = { 'accordion': true, 'active-sidebar': true };
    }
    if (this.styleList[i]['display'] == 'block') {
      this.styleList[i] = { 'display': 'none' };
    } else {
      this.styleList[i] = { 'display': 'block' };
    }
  }

  /**
   * Accordian listeners to show sidebar children
   * 
   * @memberof MenubarComponent
   */
  addEventListenersAccordian(): void {
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

  /**
   * Trigger search on search submit
   * 
   * @returns boolean (always false to avoid default behaviour)
   * @memberof MenubarComponent
   */
  searchDoc(e): boolean {
    e ? e.preventDefault ? e.preventDefault() : null : null;
    let searchValue = '';
    if (!this._h.searchUrlList.length) {
      this._h.searchUrlList = this._h.searchUrlList.concat(this._h.getLinksList(this._h.topnavItems));
      this._h.searchUrlList = this._h.searchUrlList.concat(this._h.getLinksList(this._h.sidebarItems));
      this._h.searchUrlList = this._h.searchUrlList.concat(this._h.getLinksList(this._h.footerItems));
      this._h.searchUrlList = this._h.arrayUnique(this._h.searchUrlList);
    }

    if (!this.searchform && window.location.href.includes('#/#/?search=')) {
      searchValue = decodeURIComponent(window.location.href.split('#/#/?search=')[1]);
    } else {
      searchValue = this.searchform.nativeElement.value;
    }

    if (!!this.searchform && this.searchform.nativeElement.value !== '' && !!this._h.searchUrlList.length) {
      this._wksrv.searchResult = null;
      this._h.fileData = null;
      window.location.replace('#/#/?search=' + this.searchform.nativeElement.value);
    }

    if (searchValue !== '') {
      this._wksrv.postMessage({
        action: 'search',
        key: searchValue,
        urls: this._h.searchUrlList
      });
      console.log('searchDoc: Debug Search triggered');
    }

    if (this.mobileAndTabletCheck()) {
      this.showsearch = false;
      this.searchicon = true;
    }

    return false;
  }

  /**
   * Show and hides icon or search form
   * 
   * @memberof MenubarComponent
   */
  showSearch(): void {
    this.showsearch = true;
    this.searchicon = false;
  }

  /**
   * Initiates Sidebar accordian listeners
   * Captures Hash change event
   * Add event to listen for DOMContentLoaded to open sidebar if desktop environment
   * Showing search forms based on desktop or mobile environment
   * 
   * @memberof MenubarComponent
   */
  ngOnInit(): void {

    this.addEventListenersAccordian();

    console.log('DEBUG: Menubar Host OnInit', window.location.host);

    /* Handles hash change functionality */
    window.onhashchange = function () {
      this.hashChangeFunction(window.location.href);
    }.bind(this);

    /* Handles dom content loaded fnctionality for opening nav and hiding search icon in desktop currently */
    document.addEventListener("DOMContentLoaded", function (event: Event) {
      if (!this.mobileAndTabletCheck()) {
        this.openNav();
        this.searchicon = false;
        this.showsearch = true;
      }
    }.bind(this));

  }

  ngAfterViewInit() {
    // Assigning value in search form from url

  }

  /**
   * Late initialization through view checked 
   * Reason: During the service initialization time does not capture or have the nav configs initialized
   * 
   * @memberof MenubarComponent
   */
  ngAfterViewChecked(): void {

    // Ensuring minimal checks on domLoaded and /?search= string to avoid performance issue.
    // But performance will be impacted since there is a check on domLoaded on every view change
    // TODO: Move to Observables.
    if (this._h.domLoaded !== true) {
      if (!this.mobileAndTabletCheck() && !!this.searchform && this.searchform.nativeElement.value === '' && window.location.href.includes('#/#/?search=')) {
        this.searchform.nativeElement.value = decodeURIComponent(window.location.href.split('#/#/?search=')[1]) ? decodeURIComponent(window.location.href.split('#/#/?search=')[1]) : '';
      }
      if (!!this._h.fileUrl.includes('#/#/?search=') && this._h.topnavItems.length > 0 && this._h.sidebarItems.length > 0 && !!this._h.footerItems) {
        this.searchDoc({});
        this._h.domLoaded = true;
        console.log('Debug: Menubar AfterViewChecked', this._wksrv.searchResult);
      }
    }
 
  }

}
