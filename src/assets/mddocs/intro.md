# Getting started


### { ngDocumentor }


ngDocumentor is a simple website that serves your .md files from a host location and present it as a readable site. It is quite nice and useful for static sites that are generally used for documentation purposes. Just clone the [ngDocumentor site repository](https://github.com/ngDocumentor/ngDocumentor.github.io), add your .md files, and add your link's configuration .json files. It can be as simple as that. Supports HTML only sites like github pages where there is no server configuration access to add url rewrites.


#### Getting started - 10 Minutes


* Clone the [ngDocumentor github site repository](https://github.com/ngDocumentor/ngDocumentor.github.io) OR download the [latest release v2.2.0](https://github.com/ngDocumentor/ngDocumentor.github.io/releases) to use the ngDocumentor site distribution directly.


* NOTE: If you clone the [ngDocumentor github site repository](https://github.com/ngDocumentor/ngDocumentor.github.io), and do not intend to use Service Worker / Offline viewing support then you can safely delete the `ngsw-worker.js` and `ngsw.json` files from the github clone. Alternatively, if you wish to use the offline viewing (caching) support then use the [ngDocumentor Angular source](https://github.com/ngDocumentor/ngDocumentor) to create a offline viewing enabled build for yourself. Build steps for ngDocumentor development branch can be found in [README.md](https://github.com/ngDocumentor/ngDocumentor/blob/master/README.md) or [here](#/building).


* If you have created your markdown (.md files) wiki for your project, that should be your starting point. If not create your documentation. Copy all your `.md` files (with the respective folder structure, if needed) into the `assets/mddocs` folder in the downloaded ngDocumentor release. In case of a cloned repository you will find the mddocs folder directly within the `src/assets` folder.


* Create `assets/mddocs/home.md` for top first level home link. This is currently needed and not optional. [1] `home.md` will be path `/` or `/home`.


* Your site's sidebar, top, and footer navigation all can be dynamically specified using `.json` configuration files inside `assets/config/` folder. Top navigation resides in `assets/config/topnav.json`, Sidebar menu in `assets/config/sidebar.json`, and Footer navigation in `assets/config/footer.json`.


##### Top Navigation


* Specify `brandname` and `nav` keys to define the `topnav.json`, which take care of brandname and the links definition for the topnav respectively. Links inside the `nav` key in the topnav.json is an array / group of objects which is defined using `tag` (Link text), and `link` (url path) definitions respectively as below.


* `topnav.json`

```json
{
    "brandname": "My Documentation",
    "nav": [
        { "tag": "Home", "link": "/home" },
        { "tag": "Getting Started", "link": "/intro" }
    ]
}
```

* Add any number of link structures below a max of 5 in the topnav.json. Do a responsiveness check for this. The topnavigation links are also unavailable in the mobile mode other than the brandname.



* For convinience sake, the object `{"tag": "Link Title", "link": "LinkURL"}` will be referred to as the `Link Object`; and this object is consistent across all .json configuration files (topnav, sidebar, and footer).


##### Sidebar Navigation


* You can specify a group / array of links object (submenu link items) using the `tag` (Link text), and `link` in the `nav` key of the sidebar.json file. One basic difference between the topnav.json and sidebar.json is that you can specify `children` in sidebar (unavailable in the top navigation). The definition for children array / group is the same as for other sidebar links object (and will have `tag` and `link` keys). The example is as below:


* `sidebar.json`


```json
{
    "nav": [
        { "tag": "Home", "link": "/home" },
        { "tag": "Getting Started - 5 mins", "link": "/intro" }
    ]
}
```


* Add any number of link object structures in the sidebar.json. There is no restriction on the same.


##### Footer Navigation


* Footer is the only section that needs a different look to its `footer.json` due to sections present in the footer. The links object structure used anywhere, however, remains the same.


* `footer.json`


```json
{
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


* The `footer.json` has three keys `copyright`, `nav`, and `social`each catering to copyright, navigation, and social links sections respectively in the footer; as the name suggests.


* The `copyright` key defines a link object with `tag`, and `link` keys. There is another key `text` which allows for addition of text just before the copyright text in the bottom. Have a look at this site's footer.


* The `nav` key defines footer navigation section categories each with `tag` and `children` keys. The `tag` key defines the the heading of the footer navigation sub-section. The `children` key again defines an array / group of links objects with `tag` and `link` keys.


* The `social` key defines social links section in the footer using an array of link objects with `tag` and `link` keys.


##### Final Notes


* NOTE: Please do not forget to change the `<base href="/">` to `<base href="/yoursubfolder/">` server subfolder path in the `index.html`, if your hosting folder path is not in the root. If the site repository is going to be in the root hosting folder, do not worry about this aspect.


* NOTE: All .md files including home.md will map to `/FILENAME` (without .md) url path for .json configuration files. Example: `assets/mddocs/introduction.md` will be mapped to link `/introduction`. Similarly, `assets/mddocs/mysubfolder/introduction.md` will be mapped to link `mysubfolder/introduction`.


* EXCEPTION NOTE: If you want to reference other markdown files within your markdown files as internal links then use a `#` in from of your links. Example: `assets/mddocs/somefile.md` will be referred as `#/somefile` like this `[Some File](#/somefile)` inside the referencing file. This is currently a requirement. If you think we can avoid it, please send a pull request. [Link inside .md file - Demo](#/topnav).


* Thats it! Push your code to your server root or folder. Your simple documentation site is online. 

