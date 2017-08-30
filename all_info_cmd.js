const utils = require('./utils');
const api = require('./api');
const Table = require('cli-table')

module.exports = function(credPath, credFileName, authServerURL, chronosURL, skip, limit, status, state) {
  //get credentials
  let authString
  utils.loadCredentials(credPath, credFileName)
  .then(data => {
    authString = data
    //get token
    utils.getToken(authServerURL, authString)
    .then(response => {
      token = response["Token"]
      api.getAllJobsInfoAPI(chronosURL, token, skip, limit, status, state)
      .then(response => {
        //print job descriptors in tabular form
        this.printTable(response.job_descriptors)
      })
     })
    })
  .catch(error => {
    console.log(error)
    return
  })
}

printTable = function(jobDescriptors) {
  //keys from the jobDescriptor object that will be displayed in the table
  const propsToDisplay = ["job_id", "job_name", "state", "status", "schedule", "times_executed", "next_scheduled_run"];
  //Corresponding column titles
  const columnTitles = ["ID", "Name", "State", "Status", "Schedule", "Times Executed", "Next Scheduled Time"];

  const table = new Table({
    head: columnTitles
  });

  jobDescriptors.forEach(function(job) {
    let tableRow = [];
    propsToDisplay.forEach(function(prop) {
      if (job.hasOwnProperty(prop)) {
        if (prop == "next_scheduled_run") {
          tableRow.push(new Date(job[prop] * 1000).toUTCString())
        }
        else {
          tableRow.push(job[prop])
        }
      } else {
        tableRow.push("")
      }
    })
    table.push(tableRow)
  })
  console.log(table.toString())
}
