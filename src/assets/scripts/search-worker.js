importScripts('/assets/scripts/lunr.js');

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
 * Loop through .md array results and search the aray using lunrjs
 * 
 * @param {any} mdArr 
 * @param {any} searchString 
 * @returns 
 */
function searchDocs(mdArr, searchString) {
  let result, docIndex = lunr(function () {
    this.ref('url');
    this.field('body');
    this.metadataWhitelist = ['position'];

    for (var i = 0; i < mdArr.length; i++) {
      if (!!mdArr[i].body && (mdArr[i].body.indexOf('Error') !== 0 && !mdArr.err)) {
        let a = mdArr[i];
        this.add(a);
      }
    }
  });

  result = docIndex.search(searchString, { autoWildcard: false });
  return result;
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
