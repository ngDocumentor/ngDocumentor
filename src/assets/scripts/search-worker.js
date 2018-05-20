//importScripts('/assets/scripts/elasticlunr.js');
importScripts('/assets/scripts/lunr.js');

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

async function getDocs(urlsArr) {
  let filteredRes, ajaxArr = [],
    searchableArr = [];

  // TODO: Improve ajax trigger loop into a parallel request. 
  // Issue: Error cases handling the issue for parallel trigger implementation with asyncjs, t/co, and promise.all
  // Reason: ? Iterables in t/co, asyncjs, and promise.all with error handling is a mess! 
  // Solution: Proposal needed for promise.all where errors of only error promises can be handled without breaking other promises 
  for (let i = 0; i < urlsArr.length; i++) {
    try {
      let res = await ajax(urlsArr[i]).catch(function (e) {
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

  result = docIndex.search(searchString);
  return result;
}

async function search(eData) {
  let urlsArr = eData.urls,
    searchString = eData.key;
  let mdArr = await getDocs(urlsArr);
  let searchArr = searchDocs(mdArr, searchString);
  return searchArr;
};

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
