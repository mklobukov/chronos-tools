const utils = require('./utils');
const api = require('./api');

module.exports = function(chronosURL, filePath, credPath, credFileName, authServerURL) {
  utils.loadCredentialsAndGetToken(credPath, credFileName, authServerURL)
  .then(response => {
    token = response["Token"]
    utils.loadDataFromFile(filePath)
    .then(jobDescriptionJSON => {
      api.scheduleJobAPI(chronosURL, token, jobDescriptionJSON)
      .then(response => {
        console.log("Scheduled a job: \n", response )
      })
      .catch(error => {
        console.log("Error scheduling a job\n")
      })
    })
  })
  .catch(error => {
    console.log(error)
  })
}
