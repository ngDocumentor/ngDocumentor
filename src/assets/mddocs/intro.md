# Getting started


### { ngDocumentor }
  
ngDocumenter is a simple website that will serve your .md files from a location and present it as a readable site. It is quite nice and useful for static sites that are generally used for opensource documentation. Just clone the [ngDocumenter site repository](https://github.com/ngDocumentor/ngDocumentor.github.io), add your .md files, and add your links configuration .json files. It can be as simple as that.


#### Getting started


* If you have created your markdown (.md files) wiki for your project, that should be your starting point. Copy all your `.md` files (in respective folder structure, if needed) into the `assets/mddocs` folder in the cloned repository.


* Create `assets/mddocs/home.md` for top first level home link. [1] `home.md` will be path `/` or `/home`.


* You sidebar and top navigation both can be dynamically specified using `.json` configuration files inside `assets/config/` folder. Top navigation in `assets/config/topnav.json` and Sidebar menu in `assets/config/sidebar.json`


* Specify brandname and links in topnav.json for each link using `tag` (Link text), and `link` (url path) definitions respectively.

* `topnav.json`

```json
{
    "brandname": "My Documentation",
    "topnav": [
        { "tag": "Home", "link": "/home" },
        { "tag": "Getting Started", "link": "/intro" }
    ]
}
```


* You can specify a group of links (submenu) using the `tag` (Link text), `children` (group of links specification) in the sidebar. The children will follow the above topnav.json links pattern.


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


* NOTE: All .md files including home.md and error.md will map to `/FILENAME` (without .md) url path for .json configuration files. Example: `assets/mddocs/introduction.md` will be mapped to link `/introduction`.


* EXCEPTION NOTE: If you want to reference other markdown files withing your markdown files as links then use a `#` in from of your links. Example: `assets/mddocs/somefile.md` will be referred as `#/somefile` like this `[Some File](#/somefile)`. [Link inside .md file - Demo](#/topnav)


* NOTE: Change the `<base href="/">` to `your` server subfolder path, if not root.


* Thats it! Push your code to your server root. Your simple documentation site is online. 


* Supports HTML only sites like github pages where there is no server configuration access to add url rewrites.

