const utils = require('./utils');
const api = require('./api');
const colors = require('colors');

module.exports = function(chronosURL, filePath, credPath, credFileName, authServerURL) {
  utils.loadCredentialsAndGetToken(credPath, credFileName, authServerURL)
  .then(response => {
    token = response["Token"]
    utils.loadDataFromFile(filePath)
    .then(jobDescriptionJSON => {
      api.scheduleJobAPI(chronosURL, token, jobDescriptionJSON)
      .then(response => {
        console.log(colors.green("Scheduled a job: \n"), response )
      })
      .catch(error => {
        console.log(colors.red("Error scheduling a job: "), error.message);
      })
    })
    .catch(error => {
      console.log(colors.red("Error loading job description from provided path: "), error.message)
    })
  })
  .catch(error => {
    console.log(colors.red("Error loading credentials: "), error.message);
  })
}
