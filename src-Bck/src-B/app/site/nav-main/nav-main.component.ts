import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HttpService } from '../../commons/services/http/http.service';
import { WorkerService } from '../../commons/services/worker/worker.service';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-nav-main',
  templateUrl: './nav-main.component.html',
  styleUrls: ['./nav-main.component.css']
})
export class NavMainComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  ishandsetdevice = false;
  @ViewChild('drawer') drawer: any;

  sidebarSearchedValue: string = '';
  sidebarSearchedValueChanged: Subject<string>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public _h: HttpService,
    public _wksrv: WorkerService,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public ref: ChangeDetectorRef
  ) {
    this.sidebarSearchedValueChanged = new Subject();
  }

  routeMe(link: string) {
    if (!!this.ishandsetdevice && !!this.drawer.opened) {
      this.drawer.toggle();
    }
    this._h.routeMe(link);
    return false;
  }

  onSearchedValueChange(val: any) {
    this.sidebarSearchedValueChanged.next(val);
  }

  searchForm() {
    const dialogRef = this.dialog.open(SearchComponent, {
      width: '250px',
      minHeight: '100px',
      data: { search: this._h.searchFormValue.search, type: this._h.searchFormValue.type }
    });

    dialogRef.afterClosed().subscribe(function (val) {
      // console.log('The dialog was closed', val ? val : 'closed');
      /*
      * Bug rectify code: 1: Start
      * If the search string is the same and the type is different then
      * the router does not re-route due to browser behaviour
      * Solution:
      * To resolve this, a random number is added to the query string to re-route
      */
      let searchVal = '';
      if (this._h.searchFormValue.search === val.search && this._h.searchFormValue.search !== '') {
        searchVal = !!val ? !!val.search ? val.search : '' : '';
      }

      /* Bug rectify code : 1:End */
      
      this._h.searchFormValue.search = !!val ? !!val.search ? val.search : '' : '';
      this._h.searchFormValue.type = !!val ? !!val.type ? val.type : 'advanced' : 'advanced';
      this._h.searchValue = !!val ? !!val.search ? val.search : '' : '';
      this.sidebarSearchedValue = this._h.searchFormValue.search;

      /* Bug rectify code : 1:Start */
      if (this._h.searchFormValue.search === searchVal && this._h.searchFormValue.search !== '') {
        this._h.routeMe('/?search=' + this._h.searchFormValue.search + '&q=' + Math.random());
        /* Bug rectify code : 1:End */
      } else if (this._h.searchFormValue.search !== '') {
        this._h.routeMe('/?search=' + this._h.searchFormValue.search);
      }
    }.bind(this));
  }

  ngOnInit() {
    this.isHandset$.subscribe(function (val) {
      this.ishandsetdevice = val;
    }.bind(this))

    this.sidebarSearchedValueChanged.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(function(model) {
      if (model !== '') {
        this._h.searchFormValue.search = model;
        this._h.routeMe('/?search=' + this._h.searchFormValue.search);
      }
    }.bind(this));

    this._wksrv.searchResultEvent.subscribe(function (data) {
      this._h.landingPage = false;
      this._h.fileData = null;
      if (!!this.searchform) {
        this._h.searchFormValue.search = this._h.searchValue;
      }
    }.bind(this));

    this.activatedRoute.params.subscribe(function (param) {
      if (!param['url']) {
        // Check unsubscribe and memory leak
        this.activatedRoute.queryParams.subscribe(function (query) {
          if (!query['search']) {
            this._h.searchResults = false;
            this._h.getUrl('home');
          } else {
            this._h.searchValue = query['search'];
            this._h.searchFormValue.search = query['search'];
            this.sidebarSearchedValue = query['search'];

            if (!!this._h.searchUrlList.length) {
              if (this._h.searchFormValue.type === 'keywords') {
                this._h.searchKeys(this._h.keywordsItems, this._h.searchFormValue.search);
              } else {
                this._h.searchdocs();
              } 
            }
          }
        }.bind(this))

      } else {
        this._h.searchResults = false;
        this._h.getUrl(param['url']);
      }
    }.bind(this));
  }

}
