## Search Functionality


The search functionality is a simple search which counts the occurances of key words in a phrase. It does the following currently:


* Count each word occuring in a document
* Count total of all words in a document
* Score all word's presence more than few word's presence in a document, when the gross total occurance of words in the phrase is the same.


This search will be enhanced, later (todo), by:


* Searching for sequencial permutation or partials words in a phrase
* Remove English language fillers scoring only in a phrase and associate to total count
* Adding flexibility to enable or disable search using keywords metadata for each document/url, instead of searching the whole document for a search phrase. This will be useful for cases where number of documents are high in your site
* Consider adding English language filler detection based on frequency of occurance, document size, and average occurance/frequency across documents
* Consider adding Fuzzy search (phrase word as part of searched word) and Full word search scoring with fuzzy search scoring lesser, when the gross total is the same. Fuzzy search and Full word search scoring based on inverse ratio 
(document size and frequency of occurance)
* Consider adding flexibility for scoring by adding optional weightages to keywords using settings.json
