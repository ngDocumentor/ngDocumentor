# Top navigation Definition


* The top navigation bar links are specified by `topnav` key inside the `/assets/config/settings.json` file as mentioned.


* NOTE: The link definition needs to be specified correctly for ngDocumentor to work right. It assumes you are providing the right definitions.


* The definitions are very simple .json syntax. Look at the following .json sample:


* `topnav` key definition

```json

"topnav": {
    "brandname": "My Documentation",
    "logo": "/assets/img/logo.png",
    "nav": [
        { "tag": "Home", "link": "/home" },
        { "tag": "Getting Started", "link": "/intro" }
    ]
}

```


* The key `logo` is the url / path which points to the logo used for the top navigation. Supports any extension supported by HTML `<img>` tag.



* The key `nav` is an array of link definitions with two internal key definitions `tag` and `link`. The key `tag` is the link text that will be displayed in the sidebar as a link. The key `link` is the link url to open if the tag / link text is clicked in the sidebar. You will notice that this link object structure is common accross all config `.json` files.


* There is another optional key definition - `type`. It expects only one value - `external`. All other values or even the existance of key is ignored. The {Key:Value} `{"type":"external"}` denotes that it is an external site url (complete with http:// path). These links will open the specified `link` url in a new tab window. 


* The default link behaviour is You can also specify `{"type":"internal"}` for readability's sake but it is not needed and will be ignored. Any `type` key definition without the value `'external'` will be ignored and default link behaviour is applied.


```json

{ "tag": "Introduction", "type": "external", "link": "https://github.com/ngDocumentor/ngDocumentor" }

```


* NOTE: The path maps compulsorily to `/FILENAME` (without the .md). Example: `assets/mddocs/FILENAME.md` will map to application url `/FILENAME`. Similarly, `assets/mddocs/somefolder/FILENAME` will map to application url `/somefolder/FILENAME`. Please use your link url path mapping / filenaming accordingly. The folder and filenames are `case sensitive` at the moment since linux host filenames are case sensitive.


* Thats it!! You now know how to create `topnav` key definitions for top navigation. We will talk about brandname in the [brandname](#/brandname) section.

