import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

// Modules
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

// Routes
import { AppRoutingModule } from './app.routing.module'

// Services
import { HttpService } from './commons/services/http/http.service';
import { WorkerService } from './commons/services/worker/worker.service';

// Components Directives Pipes
import { AppComponent } from './app.component';
import { NavMainComponent } from './site/nav-main/nav-main.component';
import { RendermdComponent } from './site/rendermd/rendermd.component';
import { SearchComponent } from './site/search/search.component';
import { SearchResultsComponent } from './site/search-results/search-results.component';

import {
  MatMenuModule,
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatCardModule,
  MatExpansionModule,
  MatListModule,
  MatDialogModule,
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    NavMainComponent,
    RendermdComponent,
    SearchComponent,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MarkdownModule.forRoot(), 
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }), BrowserAnimationsModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatDialogModule,
  ],
  providers: [
    HttpService,
    WorkerService
  ],
  entryComponents: [SearchComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
