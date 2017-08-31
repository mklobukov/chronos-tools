const chronosSDK = require('chronos-sdk')
const getAllJobsInfo = require('./all_info_cmd')
const publish = require('./publish_cmd')
const Config = require('./config')
const version = require('./version_cmd')
const schedule = require('./schedule_cmd')
const utils = require('./utils');
//argv[0] -- node binary path
//argv[1] -- current directory
var cmd = process.argv[2];
var inputFile = "";
if (process.argv[3]) {
  inputFile = process.argv[3];
}

switch(cmd) {
  case "login":
  console.log(process.env.HOME)
    break;

  case "publish":
    publish();
    break;

  case "schedule":
    schedule(Config.chronosFullURL, inputFile, Config.credPath, Config.credFileName, Config.authServerURL);
    break;

  case "remove":
    break;

  case "info":
  //getalljobsinfo
    getAllJobsInfo(Config.credPath, Config.credFileName, Config.authServerURL, Config.chronosFullURL, 0, 10000, "*", "*" )
    break;

  case "allinfo":

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
