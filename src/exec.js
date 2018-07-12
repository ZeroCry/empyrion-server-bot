const spawn = require('child_process').spawn;
const path = require('path');

module.exports = function exec(command, options) {
  return new Promise(function(resolve, reject) {
    const cmd = spawn(command, {
      shell: true,
      ...options,
    });
    cmd.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    cmd.stderr.on('data', (data) => {
      console.error(data.toString());
    });
    cmd.on('exit', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(code)
      }
    });
  });
}