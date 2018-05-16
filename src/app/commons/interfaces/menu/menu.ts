/**
 * Basic structure of links if it is a unit link object
 * 
 * @type tag
 * Link text that will be printed in the website
 * 
 * @type type
 * External || Internal
 * External will open in a new tab and will need to have 'http://'
 * Internal will open inside the app and the path will be appended with 'assets/docs/' folder
 * Default is Internal
 * 
 * @type link
 * link or path as per type
 * 
 * @export
 * @interface MenuLinks
 */
export interface MenuLinks {
    tag: string;
    type?: string;
    link: string;
}
/**
 * Links with which the menu items are created. Max 4-5 will be allowed
 * 
 * @type links
 * Array of type MenuLinks to be used for creation the top menu
 * 
 * @export
 * @interface Menu
 */
export interface Menu {
    brandname?: string;
    nav: MenuLinks[];
}

