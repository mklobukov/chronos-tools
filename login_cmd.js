const utils = require('./utils');
const prompt = require('prompt');
const colors = require('colors/safe');
const fs = require('fs')

module.exports = function(key, secret, credPath, credFileName, authServerURL) {
  this.promptAndSaveCredentials(key, secret, credPath, credFileName)
  .then(response => {
    const appKey = response["appKey"];
    const appSecret = response["appSecret"];
    authString = appKey + ":" + appSecret;
    const buffer = new Buffer(authString);
    const base64Auth = buffer.toString('base64');
    utils.getToken(authServerURL, base64Auth)
    .then(response => {
      console.log("Token: ", response["Token"])
    })
    .catch(error => {
      console.log("Could not get token with provided credentials");
    })
  })
  .catch(error => {
    console.log("Error: ", error);
  })
}

promptAndSaveCredentials = function(key, secret, credPath, credFileName) {
  return new Promise(function(fulfill, reject) {
    let appKey = key;
    let appSecret = secret;
    const credDirPath = process.env.HOME + "/" + credPath;
    const credFilePath = credDirPath + credFileName;

    if (appKey != "" && appSecret != "") {
      return fulfill({"appKey" : appKey, "appSecret" : appSecret})
    }

    prompt.message = colors.magenta("")
    prompt.delimiter = colors.green(":")
    prompt.start();
    prompt.get({
      properties: {
        appkey: {
          description: colors.magenta("App key")
        },
        appsecret: {
          description: colors.cyan("App secret")
        }
      }}, function (err, result) {
          appKey = result.appkey.replace(/(\r\n|\n|\r)/gm,"");
          appSecret = result.appsecret.replace(/(\r\n|\n|\r)/gm,"");
          //write credentials to the file
          //if the directory with credentials file doesn't exist, create it
          if (!fs.existsSync(credDirPath)) {
            fs.mkdirSync(credDirPath);
          }
          //write appkey and appsecret to the file inside this directory
          const dataStr = `{"key": "${appKey}", "secret": "${appSecret}"}`
          fs.writeFile(credFilePath, dataStr, function(err) {
            if (err) {
              console.log("Error writing credentials to file")
              return reject(err)
            }
            return fulfill({"appKey" : appKey, "appSecret" : appSecret})
          })
        }
    );
  })
}
