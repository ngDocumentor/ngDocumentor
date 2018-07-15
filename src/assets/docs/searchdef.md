## Search Definition


* The search functionality is a simple search which counts the occurances of key words in a phrase. The search definition is defined in the `search` key of the `/assets/config/settings.json` file.


* The search key definition has a key `type` with values `keywords` or the `fulltext` search. This defines the type of search.


* There are two possible variations for the search definition, one for fulltext based search and one for keywords based search.


* Here is one variation which applies for fullext based search:


```json

"search": {
    "type": "fulltext",
    "stopwords": []
}

```


* The search key definition has a key `stopwords` which defines the different stopwords or english fillers used during fulltext search. This key is ignored for keywords based search.


* The `stopwords` key defines an array of keywords that should be used as a filler externally. Currently, the search is not wired up for fulltext search and is a TODO item.


* Here is another variation which applies for keywords based search:


```json

"search": {
    "type": "keywords",
    "meta": [
        {"url": "/home", "keywords": ["angular"]},
        {"url": "/intro", "keywords": ["test"]}
    ]
}

```


* The search key definition has a key `meta` which defines the keywords for every link associated, which will be used for keywords search. This key is ignored for fulltext based search.


* The `meta` key in the `search` key defines an array of `url` and `keywords` keys; which define the url and the keywords associated with the url respectively.

