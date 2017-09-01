const utils = require('./utils');
const api = require('./api');
const Table = require('cli-table')

module.exports = function(credPath, credFileName, authServerURL, chronosURL, jobID) {
  //get credentials
  let authString
  utils.loadCredentialsAndGetToken(credPath, credFileName, authServerURL)
  .then(response => {
    token = response["Token"]
    api.getJobInfoAPI(chronosURL, token, jobID)
    .then(response => {
      this.printJobInfo(response)
    })
  })
  .catch(error => {
    console.log(error)
    return
  })
}


printJobInfo = function(jobDescriptor) {
  //keys from the jobDescriptor object that will be displayed in the table
  const propsToDisplay = ["job_id", "job_name", "state", "status", "schedule", "times_executed", "next_scheduled_run"];
  //Corresponding column titles
  const columnTitles = ["ID", "Name", "State", "Status", "Schedule", "Times Executed", "Next Scheduled Time"];

  const table = new Table({
    head: columnTitles
  });

  let tableRow = [];
  propsToDisplay.forEach(function(prop) {
    if (jobDescriptor.hasOwnProperty(prop)) {
      if (prop == "next_scheduled_run") {
        tableRow.push(new Date(jobDescriptor[prop] * 1000).toUTCString())
      }
      else {
        tableRow.push(jobDescriptor[prop])
      }
    } else {
      tableRow.push("")
    }
  })
  table.push(tableRow)
  console.log(table.toString())

}
