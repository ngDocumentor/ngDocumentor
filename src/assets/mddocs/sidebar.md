# Sidebar .json file specification


* The side navigation bar links are specified by `assets/config/sidebar.json` file as mentioned.


* NOTE: The link definition is needed and needs to be specified correctly for ngDocumentor to work right. It assumes you are providing the right definitions.


* The link definitions are very simple .json syntax; and look similar to that of topnav.json. Look at the following .json sample:


* `sidebar.json`

```json

{
    "sidebar": [
        { "tag": "Home", "link": "/home" },
        { "tag": "Getting Started - 5 mins", "link": "/summary" } 
    ]
}

```


* The key `sidebar` in sidebar.json is an array of link definitions with two internal key definitions `tag` and `link`. The key `tag` is the link text that will be displayed in the sidebar as a link. The key `link` is the link url to open if the tag / link text is clicked in the sidebar. You will notice that this link object structure is common accross all config `.json` files.


* Add any number of link structures in the sidebar.json. There is no restriction on the number of links in the sidebar config file.


* You can also specify `children`key instead if `link` key. This are basically submenus in sidebar (unavailable in the top navigation). `children` definitions are group (array) of submenu links specification which are available as a dropdown in the sidebar. Have a look at the sidebar of this site. The `children` link objects will also follow topnav.json and sidebar.json link's object pattern.


* `sidebar.json`

```json

{
    "sidebar": [
        { "tag": "Home", "link": "/home" },
        {
            "tag": "Getting Started - 5 mins",
            "children": [
                { "tag": "Introduction", "link": "/intro" },
                { "tag": "Basic Usage", "link": "/summary" }
            ]
        }
    ]
}

```


* In the above `sidebar.json` there are two link definitions in the `sidebar` key - one with `children` key and one without.


* Lets look at the second one with the `children` definition. The key `tag` is the link group's display text (Accordion Heading Text). It specifies a `children` key which defines the children / sub-menu item definitions which can be opened as a dropdown in the sidebar. This `children` key can define, again, the same links object with a `tag` and a `link`. Add any number of children link object structures for any `tag` in the sidebar.json. There is no restriction on the number of links.


* There is another optional key definition - `type`. It expects only one value - `external`. All other values or even the existance of key is ignored. The {Key:Value} `{"type":"external"}` denotes that it is an external site url (complete with http:// path). These links will open the specified `link` url in a new tab window. 


* The default link behaviour is You can also specify `{"type":"internal"}` for readability's sake but it is not needed and will be ignored. Any `type` key definition without the value `'external'` will be ignored and default link behaviour is applied.


```json

{ "tag": "Introduction", "type": "external", "link": "https://github.com/ngDocumentor/ngDocumentor" }

```


* NOTE: The path maps compulsorily to `/FILENAME` (without the .md). Example: `assets/mddocs/FILENAME.md` will map to application url `/FILENAME`. Similarly, `assets/mddocs/somefolder/FILENAME` will map to application url `/somefolder/FILENAME`. Please use your link url path mapping / filenaming accordingly. The folder and filenames are `case sensitive` at the moment since linux host filenames are case sensitive.


* Thats it!! You now know how to define `sidebar.json` definitions for side navigation bar.

