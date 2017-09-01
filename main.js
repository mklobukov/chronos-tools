const chronosSDK = require('chronos-sdk')
const getAllJobsInfo = require('./all_info_cmd')
const getJobInfo = require('./info_cmd')
const removeJob = require('./remove_cmd')
const publish = require('./publish_cmd')
const login = require('./login_cmd')
const Config = require('./config')
const version = require('./version_cmd')
const schedule = require('./schedule_cmd')
const utils = require('./utils')

//argv[0] -- node binary path
//argv[1] -- current directory
var cmd = process.argv[2];
var arg1 = "";
var arg2 = "";
if (process.argv[3]) {
  arg1 = process.argv[3];
}
if (process.argv[4]) {
  arg2 = process.argv[4]
}

switch(cmd) {
  case "login":
    login(arg1, arg2, Config.credPath, Config.credFileName, Config.authServerURL);
    break;

  case "publish":
    publish();
    break;

  case "schedule":
    schedule(Config.chronosFullURL, arg1, Config.credPath, Config.credFileName, Config.authServerURL);
    break;

  case "remove":
    removeJob(Config.chronosFullURL, Config.credPath, Config.credFileName, Config.authServerURL, arg1);
    break;

  case "info":
    getJobInfo(Config.credPath, Config.credFileName, Config.authServerURL, Config.chronosFullURL, arg1);
    break;

  case "allinfo":
  //getalljobsinfo
    getAllJobsInfo(Config.credPath, Config.credFileName, Config.authServerURL, Config.chronosFullURL, 0, 10000, "*", "*" )
    break;

  case "version":
    version(Config.chronosFullURL);
    break;

  case "test":
    utils.loadCredentialsAndGetToken(Config.credPath, Config.credFileName, Config.authServerURL)
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})
    break;

  default:
    console.log("Unknown command: ", cmd)
}
