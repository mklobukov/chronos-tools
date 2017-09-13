const utils = require('./utils');
const api = require('./api');
const colors = require('colors/safe');

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
    console.log(colors.red("Error getting Chronos version: "), error.message)
    return
  })
}
