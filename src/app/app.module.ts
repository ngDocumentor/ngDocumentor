import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

// Modules


// Routes


// Services
import { HttpService } from './commons/services/http/http.service';
import { WorkerService } from './commons/services/worker/worker.service';


// Components Directives Pipes
import { AppComponent } from './app.component';
import { MenubarComponent } from './modules/site/menubar/menubar.component';
import { OpenLinkInNewWindowDirective } from './commons/directives/newwindow/newwindow.directive';
import { RendererComponent } from './modules/site/renderer/renderer.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SearchListComponent } from './modules/site/search-list/search-list.component';
import { HighlightBlockComponent } from './modules/site/landing/highlight-block/highlight-block.component';
import { HighlightTextComponent } from './modules/site/landing/highlight-text/highlight-text.component';
import { HighlightSliderComponent } from './modules/site/landing/highlight-slider/highlight-slider.component';
import { HighlightMainComponent } from './modules/site/landing/highlight-main/highlight-main.component';


@NgModule({
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
    WorkerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
