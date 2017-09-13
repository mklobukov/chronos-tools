const utils = require('./utils');
const api = require('./api');
const colors = require('colors');

module.exports = function(chronosURL, credPath, credFileName, authServerURL, jobID) {
  stopRequestBody = {
    "job_id": jobID
  }

  utils.loadCredentialsAndGetToken(credPath, credFileName, authServerURL)
  .then(response => {
    token = response["Token"]
    api.stopJobAPI(chronosURL, token, JSON.stringify(stopRequestBody))
    .then(response => {
      console.log(colors.green("Force stopped the job with job ID: "), jobID);
    })
    .catch(error => {
      console.log(colors.red("Error stopping the job: "), error.message);
    })
  })
  .catch(error => {
    console.log(colors.red("Error loading credentials: "), error.message);
  })
}
