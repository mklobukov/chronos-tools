var fs = require('fs')
var path = require('path')
var request = require('request')


// exports.loadCredentials = function loadCredentails(credPath, credFileName) {
//   let authString = "";
//   const path = process.env.HOME + "/" + credPath + credFileName;
//   fs.readFile(path, 'utf8', function(err,data) {
//     if (err) {
//       console.log(err)
//       return Promise.reject(new Error(err))
//     }
//     parsedData = JSON.parse(data)
//     authString = parsedData.key + ":" + parsedData.secret;
//     console.log(authString)
//     return Promise.resolve(authString)
//     //return parsedData.key + ":" + parsedData.secret; //works
//   })
// }

_checkStatus = function(response) {
  console.log('response status: ' + response.status);
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

// exports.getToken = function getToken(authServerURL, authString) {
//   return new Promise(function(fulfill, reject) {
//     payload = `{"Type": "Server"}`
//     var options = {
//       url: 'http:/someurl',
//       headers: {
//         'User-Agent': 'Chronos',
//         'Authorization': 'Basic ' + authString,
//         'Content-Type': 'application/json'
//       },
//       body: {
//         'Type': 'Server'
//       }
//     };
//     function postRequestCallback(error, response, body) {
//       if(!error && response.StatusCode == 200) {
//         var info = JSON.parse(body);
//         console.log("Response: ", body)
//       }
//       else {
//         console.log("Error: ", error)
//       }
//     }
//
//     request(options, postRequestCallback)
//   })
// }

exports.getToken = function getToken(authServerURL, authString) {
  console.log(authServerURL, authString)
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
