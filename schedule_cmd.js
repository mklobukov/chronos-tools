const utils = require('./utils');
const api = require('./api');

module.exports = function(chronosURL, filePath, credPath, credFileName, authServerURL) {
  utils.loadCredentials(credPath, credFileName)
  .then(data => {
    authString = data
    utils.getToken(authServerURL, authString)
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
  })
}
