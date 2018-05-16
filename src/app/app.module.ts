import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

// Modules


// Routes


// Services
import { HttpService } from './commons/services/http/http.service';
import { WorkerService } from './commons/services/worker/worker.service';


// Components Directives Pipes
import { AppComponent } from './app.component';
import { MenubarComponent } from './modules/main-site/menubar/menubar.component';
import { OpenLinkInNewWindowDirective } from './commons/directives/newwindow/newwindow.directive';
import { RendermdComponent } from './modules/main-site/rendermd/rendermd.component';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    OpenLinkInNewWindowDirective,
    RendermdComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    HttpService,
    WorkerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
