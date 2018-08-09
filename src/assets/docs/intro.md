# Getting started


### { ngDocumentor }


ngDocumentor is a simple website that serves your .md files from a host location and present it as a readable site. It is quite nice and useful for static sites that are generally used for documentation purposes. Just clone the [ngDocumentor site repository](https://github.com/ngDocumentor/ngDocumentor.github.io), add your .md files, and add your link's configuration .json files. It can be as simple as that. Supports HTML only sites like github pages where there is no server configuration access to add url rewrites.


#### Getting started - 10 Minutes


* Clone the [ngDocumentor github site repository](https://github.com/ngDocumentor/ngDocumentor.github.io) OR download the [latest release v3.0.0](https://github.com/ngDocumentor/ngDocumentor.github.io/releases) to use the ngDocumentor site distribution directly.


* NOTE: If you clone the [ngDocumentor github site repository](https://github.com/ngDocumentor/ngDocumentor.github.io), and do not intend to use Service Worker / Offline viewing support then you can safely delete the `ngsw-worker.js` and `ngsw.json` files from the github clone. Alternatively, if you wish to use the offline viewing (caching) support then use the [ngDocumentor Angular source](https://github.com/ngDocumentor/ngDocumentor) to create a offline viewing enabled build for yourself. Build steps for ngDocumentor development branch can be found [here](#/building) or in [README.md](https://github.com/ngDocumentor/ngDocumentor/blob/master/README.md).


* If you have created your markdown (.md files) wiki for your project, that should be your starting point. If not create your documentation. You can have a look at [.md doc generation](#/genmd) tips and support here. Copy all your `.md` files (with the respective folder structure, if needed) into the `assets/docs` folder in the downloaded ngDocumentor release. In case of a cloned repository you will find the docs folder directly within the `src/assets` folder.


* Your site's sidebar, top, and footer navigation all can be dynamically specified using a single `settings.json` configuration file inside `assets/config/` folder. 

* The settings.json structure is simple consisting of `filetype, home, topnav, sidebar, footer, and search` keys. The Top navigation definition resides in `topnav` key, Sidebar menu definition in `sidebar` key, Footer navigation definition in `footer` key, Landing page definition in `home` key, and Search keywords definitions in `search` key.


##### Settings.json File structure

```json

{
    "filetype": "markdown",
    "home": { },
    "topnav": { },
    "sidebar": { },
    "footer": { },
    "search": { }
}

```


* Let us look at each one of them seperately.


##### Landing Page / Home Page Definition


* There are three alternatives of `home` key definition based on, first, whether you want a landing page or not. Second, if you want a landing page, then choose slider or text based home page.


* `home` key definition One


```json

"home": {
        "type": "landing",
        "url": "/",
        "highlight": {
            "type": "text",
            "img":"/assets/img/new-file-1.svg",
            "heading": "ngDocumentor",
            "description": "ngDocumentor can be as simple as you need. Max char size 250 chars.",
            "buttontext": "Getting Started",
            "buttonurl": "/intro"
        },
        "blocks": {
            "heading": "ngDocumentor features flexibility for your documentation or your Site",
            "items": [
                {"title": "Reuse Markdown", "description" : "Use your markdown readme files to create the site.", "url": "/"}
            ]
        }
    }

```


* `home` key definition Two


```json

"home": {
        "type": "landing",
        "url": "/",
        "highlight": {
            "type": "slider",
            "img": [
                {"url":"http://placeholder.pics/svg/300/00cec9-00cec9/00cec9-00cec9", "text":"ngDocumentor"}
            ]
        },
        "blocks": {
            "heading": "ngDocumentor features flexibility for your documentation or your Site",
            "items": [
                {"title": "Reuse Markdown", "description" : "Use your markdown readme files.", "url": "/"}
            ]
        }
    }

```


* `home` key definition Three


* Create `assets/docs/home.md` for top first level home link, if type of home settings is `text`. This is currently needed and not optional. [1] `home.md` will be path `/home`. For that matter you can name the file anything. But do not forget to use the url of home settings to be of the path corresponding to the filename without the extension.


```json

"home": {
        "type": "text",
        "url": "/home" // for filename home.md to be homepage
    }

```


##### Top Navigation key Definition


* Specify `brandname`, `logo` and `nav` keys to define the `topnav` object key, which take care of brandname and the links definition for the topnav respectively.


* Links inside the `nav` key inside the topnav key is an array / group of objects which is defined using `tag` (Link text), and `link` (url path) definitions respectively as below.


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

* Add any number of link structures below a maximum of 5 links in the topnav key. Do a responsiveness check for this. The topnavigation links are also unavailable in the mobile mode other than the brandname.


* For convinience sake, the object `{"tag": "Link Title", "link": "LinkURL"}` will be referred to as the `Link Object`; and this object is consistent across all settings.json key's configuration (topnav, sidebar, and footer).


##### Sidebar Navigation Definition


* You can specify a group / array of links object (submenu link items) using the `tag` (Link text), and `link` in the `nav` key of the sidebar key.


* One basic difference between the topnav and sidebar keys are that you can specify `children` in sidebar (unavailable in the top navigation key definition). The definition for children array / group is the same as for other sidebar links object (and will have `tag` and `link` keys). The example is as below:


* `sidebar` key definition


```json

"sidebar": {
    "nav": [
        { "tag": "Home", "link": "/home" },
        { "tag": "Getting Started - 10 mins", "link": "/intro" }
    ]
}

```


* Add any number of link object structures in the sidebar key definition. There is no restriction on the same.


##### Footer Navigation Definition


* Footer is the only section that needs a different look to its `footer` key definition due to sections present in the footer. The links object structure used anywhere, however, remains the same.


* `footer` key definition


```json

"footer": {
    "copyright": {
        "tag": " { ngDocumentor } ",
        "link": "/home",
        "type": "external",
        "text": "ngDocumentor is a simple markdown rendering site framework that works even on HTML only hosts like github pages",
    },
    "nav": [
        {
            "tag": "Footer Example 1",
            "children": [
                { "tag": "Getting Started", "link": "/intro" },
                { "tag": "Config .json Files", "link": "/config" }
            ]
        }
    ],
    "social": [
        { "tag": "Google +", "link": "/intro" }
    ]
}

```


* The `footer` key definition has three keys `copyright`, `nav`, and `social` each catering to copyright, navigation, and social links sections respectively in the Footer; as the name suggests.


* The `copyright` key defines a link object with `tag`, and `link` keys. There is another key `text` which allows for addition of text just before the copyright text in the bottom. Have a look at this site's footer.


* The `nav` key defines footer navigation section categories each with `tag` and `children` keys. The `tag` key defines the the heading of the footer navigation sub-section. The `children` key again defines an array / group of links objects with `tag` and `link` keys.


* The `social` key defines social links section in the footer using an array of link objects with `tag` and `link` keys.


##### Search Definition


* The search definition details what type of search you want to use - full text search or keyword search.


* `search` key definition One


```json

"search": {
    "type": "keywords", // TODO Item
    "meta": [
        {"url": "/home", "keywords": ["angular"]},
        {"url": "/intro", "keywords": ["test"]}
    ]
}

```

* `search` key definition One

```json

"search": {
    "type": "fulltext",
    "stopwords": [] // TODO Item
}

```


##### Final Notes


* NOTE: Please do not forget to change the `<base href="/">` to `<base href="/yoursubfolder/">` server subfolder path in the `index.html`, if your hosting folder path is not in the root. If the site repository is going to be in the root hosting folder, do not worry about this aspect.


* NOTE: All .md files including home.md will map to `/FILENAME` (without .md) url path for .json configuration files. Example: `assets/docs/introduction.md` will be mapped to link `/introduction`. Similarly, `assets/docs/mysubfolder/introduction.md` will be mapped to link `mysubfolder/introduction`.


* EXCEPTION NOTE: If you want to reference other markdown files within your markdown files as internal links then use a `#` in from of your links. Example: `assets/docs/somefile.md` will be referred as `#/somefile` like this `[Some File](#/somefile)` inside the referencing file. This is currently a requirement. If you think we can avoid it, please send a pull request. [Link inside .md file for Topnav - Demo](#/topnav).


* Thats it! Push your code to your server root or folder. Your simple documentation site is online. 

