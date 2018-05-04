import { Directive, ElementRef, HostListener, Input, Inject } from '@angular/core';

@Directive({ selector: '[opennewwindow]' })
export class OpenLinkInNewWindowDirective {
    // link currently unused
    @Input('routerLink') link: string;

    @Input('attr.external') external: any;

    constructor(private el: ElementRef) {
    }
    @HostListener('mousedown') onMouseEnter() {
        window.open(this.link || this.external.link);
    }
}
