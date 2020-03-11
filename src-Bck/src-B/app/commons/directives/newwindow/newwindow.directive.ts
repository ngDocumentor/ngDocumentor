import { Directive, ElementRef, HostListener, Input, Inject } from '@angular/core';

@Directive({ selector: '[opennewwindow]' })
export class OpenLinkInNewWindowDirective {

    /**
     *
     *
     * @type {*}
     * @memberof OpenLinkInNewWindowDirective
     */
    @Input('attr.external') external: any;

    constructor(private el: ElementRef) { }

    @HostListener('mousedown') onMouseEnter() {
        window.open(this.external.link);
    }
}
