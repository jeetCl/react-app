'use strict'

const fs = require('fs-extra')
const os = require('os')
const path = require('path')
const osUtils = require('./osUtils')

const { CI, TRAVIS_BUILD_DIR, TRAVIS_REPO_SLUG } = process.env

module.exports = {
  setupFrontier,
}

function setupFrontier(appPath, appName) {

  alterPackageJsonFile(appPath, appPackage => {
    const packageJson = { ...appPackage }
    delete packageJson.scripts.eject
    console.log('TRAVIS_REPO_SLUG: ', TRAVIS_REPO_SLUG)
    if (CI && TRAVIS_BUILD_DIR) {
      console.log('CI and TRAVIS_BUILD_DIR are set, so setting @fs/react-scripts to a local file: `file:${TRAVIS_BUILD_DIR}/packages/react-scripts/`')
      packageJson.dependencies['@fs/react-scripts'] = `file:${TRAVIS_BUILD_DIR}/packages/react-scripts/`
    }
    return packageJson
  })

  replaceStringInFile(appPath, './README.md', /\{GITHUB_REPO\}/g, appName)
  replaceStringInFile(appPath, './blueprint.yml', /\{\{APP_NAME\}\}/g, appName)
  replaceStringInFile(appPath, './package.json', /cra-template-name-will-be-replaced/g, appName)

  createLocalEnvFile()
  // TODO: JOEY ask if they want it to be a pwa or not.
  // if not, remove the 2 serviceworker files, all the workbox dependencies, and the tweak in index.js and the 
  // manifest.json and the 2 logo.png files
}

function alterPackageJsonFile(appPath, extendFunction) {
  let appPackage = JSON.parse(fs.readFileSync(path.join(appPath, 'package.json'), 'UTF8'))
  appPackage = extendFunction(appPackage)
  fs.writeFileSync(path.join(appPath, 'package.json'), JSON.stringify(appPackage, null, 2) + os.EOL)
}

function replaceStringInFile(appPath, fileToInjectIntoPath, stringToReplace, stringToInject) {
  const indexPath = path.join(appPath, fileToInjectIntoPath)
  let indexCode = fs.readFileSync(indexPath, 'UTF8')

  indexCode = indexCode.replace(stringToReplace, stringToInject)
  fs.writeFileSync(indexPath, indexCode)
}

function createLocalEnvFile() {
  osUtils.runExternalCommandSync('npx', ['@fs/fr-cli', 'env', 'local'])
}
