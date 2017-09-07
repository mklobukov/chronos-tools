const utils = require('./utils');
const api = require('./api');

module.exports = function(chronosURL, credPath, credFileName, authServerURL, jobID) {
  stopRequestBody = {
    "job_id": jobID
  }

  utils.loadCredentialsAndGetToken(credPath, credFileName, authServerURL)
  .then(response => {
    token = response["Token"]
    api.stopJobAPI(chronosURL, token, JSON.stringify(stopRequestBody))
    .then(response => {
      console.log("Force stopped the job with job ID ", jobID);
    })
    .catch(error => {
      console.log("Error stopping the job with job ID ", jobID);
    })
  })
  .catch(error => {
    console.log(error);
  })
}
