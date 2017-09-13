const { spawn } = require('child_process');

module.exports = function publish(dockerPrivateRepoURL, dockerJobName, dockerCredentials) {
  const imageName = dockerPrivateRepoURL + "/" + dockerJobName;
  const auth = dockerCredentials;

  //docker login -u username -p password serveraddress
  const docker_login = spawn('docker', ['login', '-u', auth.username, '-p', auth.password, auth.serveraddress]);
  docker_login.stdout.on('data', (data) => {
      console.log(`Docker login stdout: ${data}`);
      this.pushImageToRepo(imageName);
  });

  docker_login.stderr.on('data', (data) => {
    console.log(`Docker login stderr: ${data}`);
  });

  docker_login.on('error', (err) => {
    console.log("Failed to start docker subprocess.")
  });

  docker_login.on('close', (code) => {
    console.log(`Docker login process exited with code ${code}.`);
  });
}

pushImageToRepo = function(imageName) {
  //docker push serverAddress/imageName
  const image_publish = spawn('docker', ['push', imageName]);

  image_publish.stdout.on('data', (data) => {
    console.log(`Publish image stdout: ${data}`);
  });

  image_publish.stderr.on('data', (data) => {
    console.log(`Publish image stderr: ${data}`);
  });

  image_publish.on('error', (err) => {
    console.log("Failed to start docker subprocess.");
  });

  image_publish.on('close', (code) => {
    console.log(`Docker image publish process exited with code ${code}.`);
  });
}
