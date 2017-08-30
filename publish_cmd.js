const Config = require('./config');
const Docker = require('dockerode');

exports.publish = function publish() {
  const imageName = Config.dockerPrivateRepoURL + "/" + Config.Name;
  this.pushImageToRepo(imageName)
}

pushImageToRepo = function(imageName) {
  const authConfig = Config.docker_repo_config;
  const buffer = new Buffer(authConfig);
  const authString = buffer.toString('base64');

  let docker = new Docker();
  
}
