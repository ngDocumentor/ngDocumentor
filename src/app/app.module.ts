import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment';

import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MarkdownToHtmlModule } from 'ng2-markdown-to-html';

// Modules


// Routes
import { HttpService } from './commons/services/http/http.service';

// Services


// Components Directives Pipes
import { AppComponent } from './app.component';
import { MenubarComponent } from './modules/main-site/menubar/menubar.component';
import { OpenLinkInNewWindowDirective } from './commons/directives/newwindow/newwindow.directive';
import { RendermdComponent } from './modules/main-site/rendermd/rendermd.component';


@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    OpenLinkInNewWindowDirective,
    RendermdComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MarkdownToHtmlModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js')
  ],
  providers: [
    HttpService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
