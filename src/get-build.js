const path = require('path');
const fs = require('fs');

function parseBuildFile(file) {
  let [number, version] = file.replace(/\r\n/g, '\n').split('\n');
  number = number.trim();
  version = version.replace(/"/g, '').replace(/;/g, '').trim();
  return { number, version };
}

function buildFileName() {
  return path.join(global.config.empyrion_dir, 'BuildNumber.txt');
}

module.exports = function getBuild() {
  return new Promise(function(resolve, reject) {
    fs.readFile(buildFileName(), (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(parseBuildFile(data.toString()));
      }
    });
  });
}

module.exports.getBuildSync = function getBuildSync() {
  return parseBuildFile(readFileSync(buildFileName()).toString());
}