import { TestBed, async, inject } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { environment } from '../environments/environment';

import { HttpService } from './commons/services/http/http.service';
import { WorkerService } from './commons/services/worker/worker.service';

import { AppComponent } from './app.component';
import { MenubarComponent } from './modules/site/menubar/menubar.component';
import { OpenLinkInNewWindowDirective } from './commons/directives/newwindow/newwindow.directive';
import { RendererComponent } from './modules/site/renderer/renderer.component';
import { SearchListComponent } from './modules/site/search-list/search-list.component';
import { HighlightBlockComponent } from './modules/site/landing/highlight-block/highlight-block.component';
import { HighlightTextComponent } from './modules/site/landing/highlight-text/highlight-text.component';
import { HighlightSliderComponent } from './modules/site/landing/highlight-slider/highlight-slider.component';
import { HighlightMainComponent } from './modules/site/landing/highlight-main/highlight-main.component';



describe('AppComponent', () => {
  beforeEach(async(() => {
    const settingsFile = 'json';
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MenubarComponent,
        OpenLinkInNewWindowDirective,
        RendererComponent,
        SearchListComponent,
        HighlightBlockComponent,
        HighlightTextComponent,
        HighlightSliderComponent,
        HighlightMainComponent
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        MarkdownModule.forRoot({
          provide: MarkedOptions,
          useValue: {
            sanitize: true,
          },
        }),
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
      ],
      providers: [
        HttpService,
        WorkerService
      ],
    }).compileComponents();

  }));

  /*
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));
  */

  it('getSettings() tests', inject([HttpService], async(async (_h: HttpService) => {
    // check for different superficial structural errors, link definition errors, object key missing errors
    //const fixture = TestBed.createComponent(AppComponent);
    //fixture.detectChanges();
    const cmp = new AppComponent(_h);
    await cmp.ngOnInit();
    let topnav = await cmp.topnavItems;
    let sidebar = await cmp.sidebarItems;
    let footer = await cmp.footerItems;
    expect(topnav).not.toBeDefined();
    expect(sidebar).toBeDefined();
    expect(footer).toBeDefined();
  })));


});
