import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

// Modules
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

// Routes
import { AppRoutingModule } from './app-routing.module'

// Services
import { HttpService } from './commons/services/http/http.service';
import { WorkerService } from './commons/services/worker/worker.service';

// Components Directives Pipes
import { AppComponent } from './app.component';
import { NavMainComponent } from './site/nav-main/nav-main.component';
import { RendermdComponent } from './site/rendermd/rendermd.component';
import { SearchComponent } from './site/search/search.component';
import { SearchResultsComponent } from './site/search-results/search-results.component';
import { OpenLinkInNewWindowDirective } from './commons/directives/newwindow/newwindow.directive';

// import {
//   MatMenuModule,
//   MatToolbarModule,
//   MatSidenavModule,
//   MatButtonModule,
//   MatIconModule,
//   MatFormFieldModule,
//   MatInputModule,
//   MatRadioModule,
//   MatCardModule,
//   MatExpansionModule,
//   MatListModule,
//   MatDialogModule,
// } from '@angular/material';

import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatMenuModule} from '@angular/material/menu'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatRadioModule} from '@angular/material/radio'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatListModule} from '@angular/material/list'; 
import {MatDialogModule} from '@angular/material/dialog'; 


@NgModule({
  declarations: [
    AppComponent,
    NavMainComponent,
    RendermdComponent,
    SearchComponent,
    SearchResultsComponent,
    OpenLinkInNewWindowDirective
  ],
  imports: [
    BrowserModule,
    CommonModule,
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

