
/**
 * Ajax request to fetch .md files
 * Can be stripped out to make a better comprehensive function / request call. Independant project
 * 
 * @param {any} url 
 * @returns 
 */
function ajax(url) {
  var prom = new Promise(function (resolve, reject) {
    if (!!XMLHttpRequest) {
      var xhttp = new XMLHttpRequest();
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
 * @param {any} urlsArr 
 * @returns 
 */
async function getDocs(urlsArr) {
  let filteredRes, ajaxArr = [],
    searchableArr = [];

  // TODO: Improve ajax trigger loop into a parallel request. 
  // ISSUE: Error cases handling the issue for parallel trigger implementation with asyncjs, t/co, and promise.all
  // REASON: ? Iterables in t/co, asyncjs, and promise.all with error handling is a mess! 
  // SOLUTION: 
  // Proposal needed for promise.all where errors of only error promises can be handled without breaking other promises
  // Optionally using an argument, the Proposal should also allow breaking promise.all() when error in one promise occurs
  // Allow for synchronous or asynchronous implementation using an argument
  for (let i = 0; i < urlsArr.length; i++) {
    try {
      let res = await ajax('/assets/mddocs' + urlsArr[i] + '.md').catch(function (e) {
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
 * Orders the search result based on total
 * 
 * TODO: 
 * T1: Make this better by giving weightages, 
 * T2: All items having counts will score more than other not having them in one or few
 * T3: Add language fillers and score them lesser only in a phrase
 * T4: Partial Word Search and full word search in document scoring with full word weighing more (how much? what ratio)
 * T5: Now copy this logic into a function
 *
 * @param {*} arr
 * @returns
 */
function orderBy(arr) {
  return arr.sort(function(first, second) {
    if (first.total == second.total) { return 0; } 
    else if (first.total < second.total) { return 1; } 
    else { return -1; }
  });
}

/**
 * Searches the array using simple occurance count
 * 
 * TODO: Add indexes of each keyfor highlighting in browser (P5)
 *
 * @param {*} arr
 * @param {*} str
 * @returns
 */
function searchAlgoDocs(arr, str) {
  var result = {
    total: 0,
    url: str.url,
    charLength: str.body.split('').length,
    wordLength: str.body.split(' ').length,
    body: str.body.split('').splice(0, 200).join(''),
    keys: []
  };
  for (var i = 0; i < arr.length; i++) {
    var splitter = (str.body.toLowerCase().split(arr[i].toLowerCase()).length - 1) , key = arr[i];
    result.keys.push({ key : key, count: splitter });
    result.total = result.total + splitter;
  }
  return result;
}

/**
 * Loop through .md array results and search the array using searchAlgoDocs
 *
 * @param {*} mdArr
 * @param {*} searchString
 * @returns
 */
function searchDocs(mdArr, searchString) {
  let searchResult = [];
  for (var i = 0; i < mdArr.length; i++) {
    let res = searchAlgoDocs(searchString.split(' '), mdArr[i]);
    searchResult.push(res);
  }
  return orderBy(searchResult);
}

/**
 * Search function (Integrates individual functions)
 * 
 * @param {any} eData 
 * @returns 
 */
async function search(eData) {
  let urlsArr = eData.urls,
    searchString = eData.key;
  console.log('DEBUG: WorkerSearch Urls', urlsArr);
  let mdArr = await getDocs(urlsArr);
  console.log('DEBUG: WorkerSearch Docs', mdArr);
  let searchArr = searchDocs(mdArr, searchString);
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
