# Brandname specification


* The brand name is specified in the topnav.json config file. 


* Key `brandname` specifies the brand name for the site (Sidebar and the Top navigation bar).


* `topnav` key definition that defines `brandname` and `logo` keys

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

* Thats it!! Ahh, why this extra page. ;-)