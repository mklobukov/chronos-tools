const Config = require('./config');
const Docker = require('dockerode');

module.exports = function publish() {
  const imageName = Config.dockerPrivateRepoURL + "/" + Config.dockerJobName;
  this.pushImageToRepo(imageName)
}

pushImageToRepo = function(imageName) {
  const authConfig = Config.docker_repo_config;
  console.log(authConfig)
  // const buffer = new Buffer(JSON.stringify(authConfig));
  // const options = buffer.toString('base64');
  let docker = new Docker();
  image = docker.getImage(imageName);
  console.log(image)

  image.push(authConfig, function(err,data) {
    if (err) {
      console.log("Error pushing image to repo: ", err)
      return
    }
    if (data) {
      console.log("Data: ", data);
    }
  }, authConfig)
}
