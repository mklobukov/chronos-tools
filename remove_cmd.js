const utils = require('./utils');
const api = require('./api');

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
      console.log("Removed the job with job ID " + jobID)
    })
    .catch(error => {
      console.log("Error removing a job\n")
    })
  })
  .catch(error => {
    console.log(error)
  })
}
