importScripts('/assets/scripts/elasticlunr.js');

function ajax(url) {
  // Callbacks can be passed for ready state for intercepting states
  var prom = new Promise(function(resolve, reject){
      if (!!XMLHttpRequest) {
          var xhttp = new XMLHttpRequest();
          xhttp.onload = function () {
              //console.log('DONE', this.status, this.readyState, this.responseText);
              if (this.readyState == 4 && this.status == 200) {
                  resolve(this.responseText);
              }
          };
          xhttp.open("GET", url, true);
          xhttp.send();
      }
  });
  return prom;
};

function searchFilter(docArray, searchString) {
  let filteredRes;
  // grade with whole phrase and keywords seperate
  return filteredRes;
};

function search(eData) {
  // Ajax call and push to array
  // call searchFilter
  // return result
};

onmessage = function (e) {
  // trigger activity based on action
  //if (e.action === 'search') search(e);
  console.log('Test from worker');
  postMessage('Test from search worker');
};
