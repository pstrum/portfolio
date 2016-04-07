(function percentRenewable() {
  "use strict";

  function makeReq(method, URL) {
    var newPromise = new Promise(function(resolve, reject) {
      var req = new XMLHttpRequest();
      req.open(method, URL);
      req.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          resolve(req.response);
        } else {
          reject({
            status: this.status,
            statusText: req.statusText
          });
        }
      };
      req.onerror = function() {
        reject({
          status: this.status,
          statusText: req.statusText
        });
      };
      req.send();
    });

    return newPromise;
  }

  var totalEnergy = 'http://api.eia.gov/category/?api_key=94C42DDBB679F7EEA2877FE3C4C74E9C&category_id=40207';
  var totalEnergyData;
  var totalRenewable = 'http://api.eia.gov/category/?api_key=94C42DDBB679F7EEA2877FE3C4C74E9C&category_id=40426';
  var totalRenewableData;

  makeReq('GET', totalEnergy)
  .then(function success(response) {
    totalEnergyData = response;
  }, function failure(response) {
    console.error("Error", response.statusText);
  });

  makeReq('GET', totalRenewable)
  .then(function success(response) {
    totalRenewableData = response;
  }, function failure(response) {
    console.error("Error", response.statusText);
  });
})();
