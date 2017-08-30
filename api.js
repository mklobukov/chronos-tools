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
