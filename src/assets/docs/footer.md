# Footer navigation Definition


* The footer navigation bar links are specified by `footer` key inside `assets/config/settings.json` file as mentioned.


* The `footer` key has three main keys based on which of footer it caters to. You will find a sample definition for each below. 
* The `copyright` key caters to the last copyright section of the footer.
* The `nav` key caters to the footer navigation links section of the footer.
* The `social` key caters to the social links section in the footer.


* `footer` key definition sample


```json

"footer": {
    "copyright": {
        "tag": " { ngDocumentor } ",
        "link": "/home",
        "text": "ngDocumentor is a simple markdown rendering site framework that works even on HTML only hosts like github pages"
    },
    "nav": [
        {
            "tag": "Footer Example 1",
            "children": [
                { "tag": "Getting Started", "link": "/intro" },
                { "tag": "Config .json Files", "link": "/config" }
            ]
        },
        {
            "tag": "Footer Example 2",
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


* The copyright section has keys that is an links object, i.e., `tag`, and `link`. The key `link` is the link url to open if the tag / link text is clicked in the footer. You will notice that this link object structure is common across entire config `.json` file.


* The copyright section has one more key namely, the `text` key. This is the paragraph text just above the copyright section.


```json

"copyright": {
    "tag": " { ngDocumentor } ",
    "link": "/home",
    "text": "ngDocumentor is a simple markdown rendering site framework that works even on HTML only hosts like github pages"
}

```

* The `nav` key specifies the footer navigation. It is an array of objects (similar to the `children`'s link object structure in sidebar). All these objects have a `tag` and `children` key. The first `tag` is the header / heading of the one sub-section of footer navigation. The latter `children` specifies an array of link objects (with `tag` and `link` keys) like the sidebar submenu link items.
* There is no limit on number of footer navigation sections you can add.
* There is also no limit on the number of link objects you specify inside the `children` key of each `nav` array's item. But it is preferable to keep all the `nav` item's `children` key to define the same number of link objects to have a consistent UI.


```json

"nav": [
    {
        "tag": "Footer Example 1",
        "children": [
            { "tag": "Getting Started", "link": "/intro" },
            { "tag": "Config .json Files", "link": "/config" }
        ]
    }
]

```


* The `social` key specifies the social links section in the footer. This is also an array / group of links object with each object consisting of `tag` and `link` keys; with their purpose being the same as other link objects. There is no limit on number of social link objects you can add.


```json

"social": [
    { "tag": "Google +", "link": "/intro" },
    { "tag": "Github +", "link": "/git" }
]

```


* There is another optional key definition - `type` for all the links object definition. It expects only one value - `external`. The {Key:Value} `{"type":"external"}` denotes that it is an external site url (complete with http:// path). These links will open the specified `link` url in a new tab window.
* All other values or even the existance of key is ignored if it is not external. Example usage is below: 


```json

{ 
    "tag": "Introduction",
    "type": "external",
    "link": "https://github.com/ngDocumentor/ngDocumentor" 
}

```


* Example usage with external links is below:


```json

{
    "copyright": {
        "tag": " { ngDocumentor } ",
        "link": "/home",
        "type": "external",
        "text": "ngDocumentor is a markdown based site framework that works even on HTML only hosts like github pages"
    },
    "nav": [
        {
            "tag": "Footer Example 1",
            "children": [
                { "tag": "Github", "type": "external", "link": "https://github.com/ngDocumentor/ngDocumentor" }
            ]
        }
    ],
    "social": [
        { "tag": "Google +", "type": "external", "link": "/intro" }
    ]
}

```


* The default link behaviour (`type` key) is `'internal'`, which means it opens the URL in the same browser window. You do not have to specify it.


* NOTE: The path maps compulsorily to `/FILENAME` (without the .md). Example: `assets/docs/FILENAME.md` will map to application url `/FILENAME`. Similarly, `assets/docs/somefolder/FILENAME` will map to application url `/somefolder/FILENAME`. Please use your link url path mapping / filenaming accordingly. The folder and filenames are `case sensitive` at the moment since linux host filenames are case sensitive.


* Thats it!! You now know how to define `footer` key definitions for side navigation bar.

