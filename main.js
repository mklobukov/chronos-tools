const chronosSDK = require('chronos-sdk')
const getAllJobsInfo = require('./all_info_cmd')
const Config = require('./config')

//argv[0] -- node binary path
//argv[1] -- current directory
var cmd = process.argv[2];

switch(cmd) {
  case "login":
  console.log(process.env.HOME)
    break;

  case "publish":
    break;

  case "schedule":
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
    break;

  default:
    console.log("Unknown command: ", cmd)
}
