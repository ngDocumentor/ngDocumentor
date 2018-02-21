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
 * @interface SidebarLinks
 */
export interface SidebarLinks {
    tag: string;
    type?: string;
    link: string;
}

/**
 * Basic structure of links if it is a parent with child links
  * 
 * @type tag
 * Link text that will be printed in the website
 * 
 * @type children
 * Array of interface Links
 * 
 * @export
 * @interface ParentLinks
 */
export interface SidebarParentLinks {
    tag: string;
    children: SidebarLinks[];
}

/**
 * Basic structure of Links taken by sidebar menu for creation
 * 
 * @type links
 * Array of sidebar links - either of type Links or ParentLinks
 * 
 * @export
 * @interface Sidebar
 */
export interface Sidebar {
    links: [SidebarLinks | SidebarParentLinks];
}
