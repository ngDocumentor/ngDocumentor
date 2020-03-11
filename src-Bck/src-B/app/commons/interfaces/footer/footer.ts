/**
 * Basic structure of footer sections
 * 
 * @type tag
 * Tag for the footer link navigation/social/copyright section
 * 
 * @type type
 * Link type whether external or internal
 * 
 * @type link
 * The Link for the footer navigation/copyright/social
 * 
 * @type text
 * Text for the copyright section is needed. Keeping it optional for others
 * 
 * @export
 * @interface FooterLink
 */
export interface FooterLink {
    tag: string;
    type?: string;
    link: string;
    text?: string; // Needed for copyright
}

/**
 * Basic structure of footer sections
 * 
 * @type copyright
 * Link structure and copyright text for the copyright section
 * 
 * @type nav
 * Array of footer navigation Links structure
 * 
 * @type social
 * Array of social links structure
 * 
 * @export
 * @interface Footer
 */
export interface Footer {
    copyright?: FooterLink | null;
    nav?: FooterLink[];
    social?: FooterLink[];
}
