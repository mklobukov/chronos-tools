var fs = require('fs')
var path = require('path')
var request = require('request')

_checkStatus = function(response) {
  console.log('Response from API: ', response.url);
  console.log('Status: ', response.status)
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

exports.loadCredentials = function loadCredentials(credPath, credFileName) {
  return new Promise(function (fulfill, reject) {
    let authString = "";
    const path = process.env.HOME + "/" + credPath + credFileName;
    fs.readFile(path, 'utf8', function(err,data) {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        parsedData = JSON.parse(data)
        authString = parsedData.key + ":" + parsedData.secret;
        //encode auth string
        const buffer = new Buffer(authString);
        const base64Auth = buffer.toString('base64');
        return fulfill(base64Auth)
      }
    })
  })
}

exports.loadDataFromFile = function loadDataFromFile(filePath) {
  return new Promise(function (fulfill, reject) {
    fs.readFile(filePath, 'utf8', function(err,data) {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        return fulfill(data)
      }
    })
  })
}

exports.getToken = function getToken(authServerURL, authString) {
  return new Promise(function(fulfill, reject) {
    const requestHeader = new Headers();
    requestHeader.append('User-Agent', 'Chronos');
    requestHeader.append('Authorization', 'Basic ' + authString);
    requestHeader.append('Content-Type', 'application/json');
    return fetch(authServerURL, {
      method: 'POST',
      headers: requestHeader,
      body: JSON.stringify({
        "Type": "Server"
      }),
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
