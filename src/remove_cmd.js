const utils = require('./utils');
const api = require('./api');
const colors = require('colors');

module.exports = function(chronosURL, credPath, credFileName, authServerURL, jobID) {
  removeRequestBody = {
    "job_id": jobID
  }
  //console.log(chronosURL, credPath, credFileName, authServerURL, jobID)
  utils.loadCredentialsAndGetToken(credPath, credFileName, authServerURL)
  .then(response => {
    token = response["Token"]
    api.removeJobAPI(chronosURL, token, JSON.stringify(removeRequestBody))
    .then(response => {
      console.log(colors.green("Removed the job with job ID: ") + jobID)
    })
    .catch(error => {
      console.log(colors.red("Error removing a job: "), error.message)
    })
  })
  .catch(error => {
    console.log(colors.red("Error loading credentials: "), error.message)
  })
}
