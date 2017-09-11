const getAllJobsInfo = require('./all_info_cmd');
const getJobInfo = require('./info_cmd');
const removeJob = require('./remove_cmd');
const stopJob = require('./stop_cmd');
const publish = require('./publish_cmd');
const login = require('./login_cmd');
const version = require('./version_cmd');
const schedule = require('./schedule_cmd');
const utils = require('./utils');
const fs = require('fs');
const colors = require('colors');

//default distributed config
//includes path to credentials file, authserver url, and chronos url
const defaultConfig = require('./default_config.json');
//config customized by user. Adds fields to Config and can override
//authserver url and chronos url
let customConfig, Config;

try {
  customConfig = JSON.parse(fs.readFileSync('./custom_config.json', 'utf8'));
} catch (err) {
  console.log(colors.magenta("Custom config not provided, using default values only"));
}

if (customConfig) {
  //do not allow modification of credPath and credFileName:
  delete customConfig.credPath;
  delete customConfig.credFileName;
  //merge the two configs together:
  Config = Object.assign({}, defaultConfig, customConfig);
} else {
  Config = defaultConfig;
}

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
    publish(Config.dockerPrivateRepoURL, Config.dockerJobName, Config.dockerCredentials);
    break;

  case "schedule":
    schedule(Config.chronosURL, arg1, Config.credPath, Config.credFileName, Config.authServerURL);
    break;

  case "remove":
    removeJob(Config.chronosURL, Config.credPath, Config.credFileName, Config.authServerURL, arg1);
    break;

  case "stop":
    stopJob(Config.chronosURL, Config.credPath, Config.credFileName, Config.authServerURL, arg1);
    break;

  case "info":
    getJobInfo(Config.credPath, Config.credFileName, Config.authServerURL, Config.chronosURL, arg1);
    break;

  case "allinfo":
  //getalljobsinfo
    getAllJobsInfo(Config.credPath, Config.credFileName, Config.authServerURL, Config.chronosURL, 0, 10000, "*", "*" )
    break;

  case "version":
    version(Config.chronosURL);
    break;

  case "test":
    utils.loadCredentialsAndGetToken(Config.credPath, Config.credFileName, Config.authServerURL)
    .then(data => {console.log(data)})
    .catch(err => {console.log(err)})
    break;

  default:
    console.log(colors.yellow("Unknown command: "), colors.blue(cmd))
}
