## Landing Page Definition


* The landing page or the home page definition has three variations of definitions based on the whether you want to enable the landing page, and if enabled then whether you need to have a text highlighter or a slider highlighter in the landing page.


* First definition variation that disables landing page and shows a markdown file based text rendering url. 


```json

"home": {
    "type": "text",
    "url": "/home",
}

```


* The value option `text` for `type` key disables landing page and allows a markdown file enabled home page.


* The second is the `url` key. The naming of the url is the filename without the extension. Eg: `FILENAME.md` will have url `/FILENAME`


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


* The second variation keys are defined as per structure below:
    - `url` - The path to landing page (non changable from `/`)
    - `highlight` - Defines the highlighter (`text` or `slider`)
        * `type` - Defines type of the highlighter. This case `text`
        * `img` - Defines the image url/link/path of the image to be put in the highlighter.
        * `heading` - Defines the heading of the highlighter.
        * `description` - Defines the text of the highlighter. Max 250 characters.
        * `buttontext` - Defines the text of the button.
        * `buttonurl` - Defines the url the button needs to route to.
    - `blocks` - Defines the block highlighter.
        * `heading` - Defines the heading text for the section
        * `items` - Defines an array of objects that consist of `title`, `description`, and `url`
            - `title` - Defines the title/head of the url.
            - `description` - Defines the description of the block. Limit it to 70 characters.
            - `url` - Defines the url to browse to.


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


* The third variation keys are defined as per structure below:
    - `url` - The path to landing page (non changable from `/`)
    - `highlight` - Defines the highlighter (`text` or `slider`)
        * `type` - Defines type of the highlighter. This case `slider`.
        * `img` - Defines the image url/link/path array for the slider to be used for the slider.
    - `blocks` - Defines the block highlighter.
        * `heading` - Defines the heading text for the section.
        * `items` - Defines an array of objects that consist of `title`, `description`, and `url`.
            - `title` - Defines the title/head of the url.
            - `description` - Defines the description of the block. Limit it to 70 characters.
            - `url` - Defines the url to browse to.


* You change the landing page css in `assets/css/landing-styles.css`; which allows you to change the position of the image in the text highlighter.