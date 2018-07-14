## Landing Page Definition


* First definition variation that disables landing page and shows a markdown based text rendering url


```json

"home": {
    "type": "text",
    "url": "/",
}

```


* Second definition variation that enables landing page but shows a text highlighter with blocks of links


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
            {"title": "Reuse Markdown", "description" : "Use your markdown readme files.", "url": "/"},
            {"title": "Offline Support", "description" : "Basic offline support / PWA using service workers.", "url": "/"}
        ]
    }
}

```


* Third definition variation that enables landing page but shows slider highlighter with blocks of links


```json

"home": {
    "type": "landing",
    "url": "/",
    "highlight": {
        "type": "slider",
        "img": [
            {"url":"http://placeholder.pics/svg/300", "text":"ngDocumentor can be as simple as you need"},
            {"url":"/assets/img/test-two.jpg", "text":"One settings file to manage the whole documentation site"}
        ]
    },
    "blocks": {
        "heading": "ngDocumentor features flexibility for your documentation or your Site",
        "items": [
            {"title": "Reuse Markdown", "description" : "Use your markdown readme files.", "url": "/"},
            {"title": "Offline Support", "description" : "Basic offline support / PWA using service workers.", "url": "/"}
        ]
    }
}

```

