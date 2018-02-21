# Top navigation .json file specification


* The top navigation bar links are specified by `assets/config/topnav.json` file as mentioned.


* NOTE: The link definition needs to be specified correctly for ngDocumentor to work right. It assumes you are providing the right definitions.


* The definitions are very simple .json syntax. Look at the following .json sample:


* `topnav.json`

```json
{
    "brandname": "My Documentation",
    "topnav": [
        { "tag": "Home", "link": "/" },
        { "tag": "Getting Started", "link": "/" }
    ]
}
```


* The key `topnav` is an array of link definitions with two internal key definitions `tag` and `link`.


* The key `tag` is the link text.


* The key `link` is the link url.


* There is another optional internal key definition - `type`. It expects only one value - `external`. All other values or even the existance of key is ignored. The {Key:Value} `{"type":"external"}` denotes that it is an external site url (complete with http:// path). These links will open the specified `link` url in a new tab window.


* NOTE: The path maps compulsorily to `/docs/FILENAME` (without the .md). Example: `assets/mddocs/FILENAME.md` will map to application url `/docs/FILENAME`. Similarly, `assets/mddocs/somefolder/FILENAME` will map to application url `/docs/somefolder/FILENAME`. Please use your link url path mapping accordingly.


* Thats it!! You now know how to create `topnav.json` definitions for top navigation. We will talk about brandname  in the brandname section.

