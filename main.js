var chronosSDK = require('chronos-sdk')
const getAllJobsInfo = require('./all_info_cmd')


var configFileName        = "chronos.json",
    gitlabURL             = "https://git.iris.comcast.com/api/v3",
    gitlabToken           = "t_AW6Brn3tczNyF3HqXW",
    gitlabProjectURL      = "git.iris.comcast.com/chronos/",
    gitlabUsername        = "kronos",
    gitlabPassword        = "C0mcast99",
    dockerPrivateRepoURL  = "st-docreg-asb-001.poc.sys.comcast.net",
    dockerUserName        = "chronos",
    dockerPassword        = "poseidon",
    credPath              = ".chronos/",
    credFileName          = "credentials.json",
    authServerURL         = "http://localhost:4655/v1/login/",
    chronosServerURL      = "localhost",
    chronosServerPort     = "9000",
    chronosFullURL        = "http://localhost:8080";


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
    getAllJobsInfo(credPath, credFileName, authServerURL, chronosFullURL, 0, 10000, "*", "*" )
    break;

  case "allinfo":

    break;

  case "version":
    break;

  default:
    console.log("Unknown command: ", cmd)
}
