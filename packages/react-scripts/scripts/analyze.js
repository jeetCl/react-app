'use strict';

process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

const chalk = require('react-dev-utils/chalk');
const execSync = require('child_process').execSync;
const fs = require('fs-extra');
const path = require('path');
const paths = require('../config/paths');

const analyzer = path.join(
  paths.appNodeModules,
  '.bin',
  'webpack-bundle-analyzer'
);
console.log(chalk.green('Using analyzer command: ' + analyzer));

if (process.env.WEBPACK_BUNDLE_ANALYZER_FILE) {
  const fileName = process.env.WEBPACK_BUNDLE_ANALYZER_FILE + '.json';
  const file = path.join(paths.appBuild, fileName);
  console.log(chalk.green('    Using stats file: ' + file));

  const statsExist = fs.existsSync(file);
  if (statsExist) {
    execSync(analyzer + ' ' + file);
  } else {
    console.log(
      chalk.red(
        'The stats file does not exist. Did you do a production build first?'
      )
    );
  }
} else {
  console.log(
    chalk.red(
      "The variable 'WEBPACK_BUNDLE_ANALYZER_FILE' is not defined in your env file."
    )
  );
}
