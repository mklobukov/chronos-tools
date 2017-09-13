const fs = require('fs');
const path = require('path');
const colors = require('colors/safe');
require('isomorphic-fetch');

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

loadCredentials = function(credPath, credFileName) {
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

loadDataFromFile = function(filePath) {
  return new Promise(function (fulfill, reject) {
    fs.readFile(filePath, 'utf8', function(err,data) {
      if (err) {
        reject(err)
      } else {
        return fulfill(data)
      }
    })
  })
}

getToken = function(authServerURL, authString) {
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

loadCredentialsAndGetToken = function(credPath, credFileName, authServerURL) {
  return new Promise(function(fulfill, reject) {
    this.loadCredentials(credPath, credFileName)
    .then(authString => {
      this.getToken(authServerURL, authString)
      .then(token => {
        fulfill(token)
      })
      .catch(error => {
        console.log(error)
        reject(error)
      })
    })
    .catch(error => {
      reject(error)
    })
  })
}

module.exports = {
  loadCredentialsAndGetToken: loadCredentialsAndGetToken,
  getToken: getToken,
  loadCredentials: loadCredentials,
  loadDataFromFile: loadDataFromFile
}
