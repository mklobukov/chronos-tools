const utils = require('./utils');
const api = require('./api');

module.exports = function(chronosURL) {
  api.getVersionAPI(chronosURL)
  .then(response => {
    if (response.version) {
      console.log(response.version)
    } else {
      console.log(response)
    }
    return
  })
  .catch(error => {
    console.log("Error getting Chronos version: ", error)
    return
  })
}
