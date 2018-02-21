import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { docRoutingProviders, docrouting } from './routes/documentation.routes';
import { MarkdownToHtmlModule, MarkdownToHtmlService } from 'ng2-markdown-to-html';

import { RendermdComponent } from './components/rendermd/rendermd.component';


@NgModule({
  imports: [
    CommonModule,
    docrouting,
    MarkdownToHtmlModule.forRoot(),
  ],
  providers: [
    docRoutingProviders,
    MarkdownToHtmlService,
  ],
  declarations: [
    RendermdComponent,
  ],
  exports: [
    RendermdComponent,
  ]
})
export class DocumentationModule { }
