module.exports = require(require.resolve('resolve-from'));

module.exports.silent = (fromDirectory, request) => {
  const fs = require('fs');
  const path = require('path');

  // if (fromDirectory.includes('fixtures/language-support')) {
  //   return require(require.resolve('resolve-from'))(fromDirectory, request);
  // }
  try {
    fromDirectory = fs.realpathSync(fromDirectory);
  } catch (error) {
    if (error.code === 'ENOENT') {
      fromDirectory = path.resolve(fromDirectory);
    } else {
      return;
    }
  }

  const outputPath = path.join(fromDirectory, 'node_modules', request);
  if (fs.existsSync(outputPath)) {
    return outputPath;
  }
};
