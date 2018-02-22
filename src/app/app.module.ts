import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MarkdownToHtmlModule } from 'ng2-markdown-to-html';

// Modules


// Routes
import { appRoutingProviders, routing } from './routes/main.routes';
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
    routing,
    HttpModule,
    MarkdownToHtmlModule.forRoot(),
  ],
  providers: [
    appRoutingProviders,
    HttpService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
