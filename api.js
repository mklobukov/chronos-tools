const colors = require('colors/safe');

_checkStatus = function(response) {
  console.log(colors.cyan('Response from API: '), response.url, " -- Status: ", response.status);
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

_parseJSON = function(response) {
  return response.json();
}

exports.getJobInfoAPI = function getJobInfoAPI(chronosURL, token, jobID) {
  const url = chronosURL + `/v1/jobinfo/${jobID}`;
  return new Promise(function(fulfill, reject) {
    const requestHeader = new Headers();
    requestHeader.append('User-Agent', 'Chronos');
    requestHeader.append('Authorization', 'Bearer ' + token);
    requestHeader.append('Content-Type', 'application/json');
    return fetch(url, {
      method: 'GET',
      headers: requestHeader
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then(data => {
      fulfill(data)
    })
    .catch(error => {
      console.log(error)
      reject(error)
    })
  })
}

exports.getAllJobsInfoAPI = function getAllJobsInfoAPI(chronosURL, token, skip, limit, status, state) {
  const url = chronosURL + `/v1/alljobsinfo/skip/${skip}/limit/${limit}/status/${status}/state/${state}`;
  return new Promise(function(fulfill, reject) {
    const requestHeader = new Headers();
    requestHeader.append('User-Agent', 'Chronos');
    requestHeader.append('Authorization', 'Bearer ' + token);
    requestHeader.append('Content-Type', 'application/json');
    return fetch(url, {
      method: 'GET',
      headers: requestHeader
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then(data => {
      fulfill(data)
    })
    .catch(error => {
      console.log(error)
      reject(error)
    })
  })
}

exports.getVersionAPI = function getVersionAPI(chronosURL) {
  const url = chronosURL + "/v1/version";
  return new Promise(function(fulfill, reject) {
    const requestHeader = new Headers();
    requestHeader.append('User-Agent', 'Chronos');
    //requestHeader.append('Authorization', 'Bearer ' + token);
    requestHeader.append('Content-Type', 'application/json');
    return fetch(url, {
      method: 'GET',
      headers: requestHeader
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then(data => {
      fulfill(data)
    })
    .catch(error => {
      console.log(error)
      reject(error)
    })
  })
}

exports.scheduleJobAPI = function scheduleJobAPI(chronosURL, token, requestBody) {
  const url = chronosURL + "/v1/schedule";
  return new Promise(function(fulfill, reject) {
    const requestHeader = new Headers();
    //requestHeader.append('User-Agent', 'Chronos');
    requestHeader.append('Authorization', 'Bearer ' + token);
    requestHeader.append('Content-Type', 'application/json');
    return fetch(url, {
      method: 'POST',
      headers: requestHeader,
      body: requestBody
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then(data => {
      fulfill(data)
    })
    .catch(error => {
      console.log(error)
      reject(error)
    })
  })
}

exports.removeJobAPI = function removeJobAPI(chronosURL, token, requestBody) {
  const url = chronosURL + "/v1/removejob";
  return new Promise(function(fulfill, reject) {
    const requestHeader = new Headers();
    requestHeader.append('Authorization', 'Bearer ' + token);
    requestHeader.append('Content-Type', 'application/json');
    return fetch(url, {
      method: 'POST',
      headers: requestHeader,
      body: requestBody
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then(data => {
      fulfill(data)
    })
    .catch(error => {
      console.log(error)
      reject(error)
    })
  })
}
