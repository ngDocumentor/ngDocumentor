# Sidebar .json file specification


* The side navigation bar links are specified by `assets/config/sidebar.json` file as mentioned.


* NOTE: The link definition needs to be specified correctly for ngDocumentor to work right. It assumes you are providing the right definitions.


* The link definitions are very simple .json syntax; and look similar to that of topnav.json. Look at the following .json sample:


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


* The key `sidebar` is an array of link definitions with two internal key definitions `tag` and `link`.


* There are two child link definitions - one with children key and one without.


* Lets look at the first one without children definition:


* The key `tag` is the link text.


* The key `link` is the link url.


* There is another optional internal key definition - `type`. It expects only one value - `external`. All other values or even the existance of key is ignored. The {Key:Value} `{"type":"external"}` denotes that it is an external site url (complete with http:// path). These links will open the specified `link` url in a new tab window.


* Now, lets look at the second one with children definition:


* The key `tag` is the link group's display text (Accordion Heading Text)


* The key children specifies the children / sub-menu item definitions. They are exactly the same as a normal link definition with `tag`, `type`, and `link`. All definition details are the same. `type` is for external links and all other values of type will be ignored as other definitions.


* NOTE: The path maps compulsorily to `/FILENAME` (without the .md). Example: `assets/mddocs/FILENAME.md` will map to application url `/FILENAME`. Similarly, `assets/mddocs/somefolder/FILENAME` will map to application url `/somefolder/FILENAME`. Please use your link url path mapping accordingly.


* Thats it!! You now know how to define `sidebar.json` definitions for side navigation bar.

