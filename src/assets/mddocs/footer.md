# Footer navigation .json file specification


* The footer navigation bar links are specified by `assets/config/footer.json` file as mentioned.


* The `footer.json` has three main keys based on which of footer it caters to. The `copyright` key caters to the last copyright section of the footer. The `nav` key caters to the footer navigation links section of the footer. The `social` key caters to the social links section in the footer. Below is a sample definition.


* `footer.json`


```json

{
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
                { "tag": "Config .json Files", "link": "/config" },
                { "tag": "Github", "link": "/home" }
            ]
        },
        {
            "tag": "Footer Example 2",
            "children": [
                { "tag": "Getting Started", "link": "/intro" },
                { "tag": "Config .json Files", "link": "/config" },
                { "tag": "Github", "link": "/home" }
            ]
        }
    ],
    "social": [
        { "tag": "Google +", "link": "/intro" }
    ]
}

```


* The copyright section has keys that are similar to links object, i.e., `tag`, and `link`. The key `link` is the link url to open if the tag / link text is clicked in the footer. You will notice that this link object structure is common across all config `.json` files.


* The copyright section has one more key namely, the `text` key. This is the definition of the text just above the copyright section.


```json

"copyright": {
    "tag": " { ngDocumentor } ",
    "link": "/home",
    "text": "ngDocumentor is a simple markdown rendering site framework that works even on HTML only hosts like github pages"
}

```

* The `nav` key specifies the footer navigation. It is an array of objects and all these objects have a `tag` and `children` key. The first `tag` is the header / heading of the one sub-section of footer navigation. The latter `children` specifies an array of link objects (with `tag` and `link` keys). There is no limit on number of footer navigation sections you can add.


```json


"nav": [
    {
        "tag": "Footer Example 1",
        "children": [
            { "tag": "Getting Started", "link": "/intro" },
            { "tag": "Config .json Files", "link": "/config" },
            { "tag": "Github", "link": "/home" }
        ]
    }
]

```


* The `social` key specifies the social links section in the footer. This is also an array of links object with each object consisting of `tag` and `link` keys; with their purpose being the same as other link objects. There is no limit on number of social link objects you can add.


```json

"social": [
    { "tag": "Google +", "link": "/intro" }
]

```


* There is another optional key definition - `type` for the links object. It expects only one value - `external`. All other values or even the existance of key is ignored. The {Key:Value} `{"type":"external"}` denotes that it is an external site url (complete with http:// path). These links will open the specified `link` url in a new tab window. Example usage is below: 


```json

{ "tag": "Introduction", "type": "external", "link": "https://github.com/ngDocumentor/ngDocumentor" }

```


* Example usage with external links is below:


```json

{
    "copyright": {
        "tag": " { ngDocumentor } ",
        "link": "/home",
        "type": "external",
        "text": "ngDocumentor is a simple markdown rendering site framework that works even on HTML only hosts like github pages"
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


* The default link behaviour is You can also specify `{"type":"internal"}` for readability's sake but it is not needed and will be ignored. Any `type` key definition without the value `'external'` will be ignored and default link behaviour is applied.


* NOTE: The path maps compulsorily to `/FILENAME` (without the .md). Example: `assets/mddocs/FILENAME.md` will map to application url `/FILENAME`. Similarly, `assets/mddocs/somefolder/FILENAME` will map to application url `/somefolder/FILENAME`. Please use your link url path mapping / filenaming accordingly. The folder and filenames are `case sensitive` at the moment since linux host filenames are case sensitive.


* Thats it!! You now know how to define `footer.json` definitions for side navigation bar.

