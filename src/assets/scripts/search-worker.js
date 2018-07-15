/**
 * Ajax request to fetch .md files
 * Can be stripped out to make a better comprehensive function / request call. Independant project
 * 
 * @param {any} url - URL to be searched
 * @returns {string} - Fetched .md doc's string
 */
function ajax(url) {
  let prom = new Promise(function (resolve, reject) {
    if (!!XMLHttpRequest) {
      let xhttp = new XMLHttpRequest();
      xhttp.timeout = 5000;

      xhttp.onload = function () {
        //console.log('DONE', this.status, this.readyState, this.responseText);
        if (this.readyState == 4 && (this.status == 200)) {
          resolve(this.responseText);
        }
        reject({
          readyState: this.readyState,
          status: this.status
        });
      };

      xhttp.timeout = function () {
        //console.log('DONE', this.status, this.readyState, this.responseText);
        reject({
          readyState: this.readyState,
          status: this.status
        });
      };

      xhttp.open("GET", url, true);
      xhttp.send();
    }
  });
  return prom;
};

/**
 * Trigger Ajax request to get the .md files for search
 * Performance issue: Synchronous behaviour due to await inside the loop. Proposal detailed
 * Can be made async. Currently async makes code event driven, complicated, and messy (TODO item)
 * 
 * @param {any} urlsArr - Array of URLs
 * @returns {any[]} - Array of fetched .md docs
 */
async function getDocs(urlsArr) {
  let filteredRes, ajaxArr = [],
    searchableArr = [];

  // TODO: Improve ajax trigger loop into a concurrent request. 
  // ISSUE: Error cases handling the issue for concurrent trigger implementation with asyncjs, t/co, and promise.all
  // REASON: ? Iterables in t/co, asyncjs, and promise.all with error handling is a mess! 
  // SOLUTION: 
  // Proposal needed for promise.all where errors of only error promises can be handled without breaking other promises
  // Optionally using an argument, the Proposal should also allow breaking promise.all() when error in one promise occurs
  // Allow for synchronous or asynchronous implementation using an argument
  for (let i = 0; i < urlsArr.length; i++) {
    try {
      let res = await ajax('/assets/docs' + urlsArr[i] + '.md').catch(function (e) {
        throw new Error(e);
      });
      ajaxArr[i] = {
        body: res,
        url: urlsArr[i]
      }
    } catch (e) {
      ajaxArr[i] = {
        body: e.stack || 'Error',
        url: urlsArr[i],
        err: true
      }
    }
  }
  return ajaxArr;
};

/**
 * Function to check fillers of English language when fillers are in a phrase
 * Credit: Fillers taken from lunrjs
 *
 * @param {Array} arr
 * @param {String} str
 * @returns {str || undefined}
 */
function checkFiller(arr, str) {
  var filler = [
    'a',
    'able',
    'about',
    'across',
    'after',
    'all',
    'almost',
    'also',
    'am',
    'among',
    'an',
    'and',
    'any',
    'are',
    'as',
    'at',
    'be',
    'because',
    'been',
    'but',
    'by',
    'can',
    'cannot',
    'could',
    'dear',
    'did',
    'do',
    'does',
    'either',
    'else',
    'ever',
    'every',
    'for',
    'from',
    'get',
    'got',
    'had',
    'has',
    'have',
    'he',
    'her',
    'hers',
    'him',
    'his',
    'how',
    'however',
    'i',
    'if',
    'in',
    'into',
    'is',
    'it',
    'its',
    'just',
    'least',
    'let',
    'like',
    'likely',
    'may',
    'me',
    'might',
    'most',
    'must',
    'my',
    'neither',
    'no',
    'nor',
    'not',
    'of',
    'off',
    'often',
    'on',
    'only',
    'or',
    'other',
    'our',
    'own',
    'rather',
    'said',
    'say',
    'says',
    'she',
    'should',
    'since',
    'so',
    'some',
    'than',
    'that',
    'the',
    'their',
    'them',
    'then',
    'there',
    'these',
    'they',
    'this',
    'to',
    'too',
    'us',
    'wants',
    'was',
    'we',
    'were',
    'what',
    'when',
    'where',
    'which',
    'while',
    'who',
    'whom',
    'whome',
    'why',
    'will',
    'with',
    'would',
    'yet',
    'you',
    'your'
  ];

  if (arr instanceof Array && arr.length) {
    filler = filler.concat(arr);
  }

  if (filler.includes(str)) {
    return;
  }
  return str;
}

/**
 * Orders the search result based on total
 * 
 * TODO: 
 * T1: Make this better by giving weightages, 
 * T2 (Done): All items having counts will score more than other not having them in one or few
 * T3: Add language fillers and score them lesser only in a phrase
 * T4: Partial Word Search and full word search in document scoring with full word weighing more (how much? what ratio)
 * T5: Now copy this logic into a function
 *
 * @param {*} arr - Searched Array to be sorted as per above logic
 * @returns {any[]} - Relevant search results array without unrelevant data
 */
function orderBy(arr) {
  return arr.sort(function (first, second) {
    if (first.total == second.total) {
      function countZeros(item) {
        if (item.count === 0) {
          return item;
        }
      }
      let f = first.keys.filter(countZeros);
      let s = second.keys.filter(countZeros);
      if (f.length > s.length) {
        return 1;
      } else if (f.length < s.length) {
        return -1;
      } else if (f.length === s.length) {
        return 0;
      }
    } else if (first.total < second.total) {
      return 1;
    } else {
      return -1;
    }
  }).filter(function (item) {
    if (item.total !== 0) {
      return item;
    }
  });
}

/**
 * Searches the array using simple occurance count
 * 
 * TODO: Add indexes of each keyfor highlighting in browser (P5)
 *
 * @param {*} arr - Array to be searched for key words
 * @param {*} str - String to be searched
 * @param {*} fillers - Custom Array of fillers specified in settings.json
 * @returns {any[]} - Search results
 */
function searchAlgoDocs(arr, str, fillers) {
  let result = {
    total: 0,
    url: str.url,
    charLength: str.body.split('').length,
    wordLength: str.body.split(' ').length,
    body: str.body.split('').splice(0, 200).join(''),
    keys: []
  };
  for (let i = 0; i < arr.length; i++) {
    let splitter = (str.body.toLowerCase().split(arr[i].toLowerCase()).length - 1),
      key = arr[i];
    result.keys.push({
      key: key,
      count: splitter
    });
    if (!!checkFiller(fillers, arr[i]) || arr.length === 1) {
      result.total = result.total + splitter;
    }
  }
  return result;
}

/**
 * Loop through .md array results and search the array using searchAlgoDocs
 *
 * @param {*} mdArr - Array of .md files
 * @param {*} searchString - Search string
 * @param {*} fillers - Custom Array of fillers specified in settings.json
 * @returns {any[]} - Ordered array
 */
function searchDocs(mdArr, searchString, fillers) {
  let searchResult = [];
  for (let i = 0; i < mdArr.length; i++) {
    let res = searchAlgoDocs(searchString.split(' '), mdArr[i], fillers);
    searchResult.push(res);
  }
  return orderBy(searchResult);
}

/**
 * Search function (Integrates individual functions)
 * 
 * @param {any} eData - Search relevant data with search string, urls
 * @returns {any[]} - Search result's array
 */
async function search(eData) {
  let urlsArr = eData.urls,
    searchString = eData.key,
    fillers = eData.fillers || [];
  console.log('DEBUG: WorkerSearch Urls', urlsArr);
  let mdArr = await getDocs(urlsArr);
  console.log('DEBUG: WorkerSearch Docs', mdArr);
  let searchArr = searchDocs(mdArr, searchString, fillers);
  console.log('DEBUG: WorkerSearch Results', searchArr);
  return searchArr;
};

/**
 * Capture messages from parent process for any action
 * 
 * @param {any} e 
 */
onmessage = async function (e) {
  let actionResult;
  // trigger activity based on action
  if (e.data.action === 'search') {
    actionResult = await search(e.data);
    postMessage({
      action: e.data.action,
      result: actionResult
    });
  };
};
