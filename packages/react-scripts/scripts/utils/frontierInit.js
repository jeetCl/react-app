'use strict'

const fs = require('fs-extra')
const os = require('os')
const path = require('path')
const semver = require('semver')

const osUtils = require('./osUtils')

const { CI, TRAVIS_BUILD_DIR, TRAVIS_BUILD_NUMBER } = process.env

module.exports = {
  setupFrontier,
  alterPackageJsonFile,
  getTravisPrereleaseVersion,
}

/**
 * Strip of any existing prerelease info and make a travisPrelease based on the travis job number
 *
 */
function getTravisPrereleaseVersion(originalVersion) {
  const major = semver.major(originalVersion)
  const minor = semver.minor(originalVersion)
  const patch = semver.patch(originalVersion)

  return `${major}.${minor}.${patch}-travisPrerelease.${TRAVIS_BUILD_NUMBER}`
}

function setupFrontier(appPath, appName) {
  alterPackageJsonFile(appPath, appPackage => {
    const packageJson = { ...appPackage }
    delete packageJson.scripts.eject

    if (CI && TRAVIS_BUILD_DIR) {
      const reactScriptPackageJson = require(path.join(__dirname, '../../package.json'))
      const travisPrereleaseVersion = getTravisPrereleaseVersion(reactScriptPackageJson.version)
      console.log(
        `CI and TRAVIS_BUILD_DIR are set, so setting @fs/react-scripts to Travis prerelease version "${travisPrereleaseVersion}"`
      )
      packageJson.dependencies['@fs/react-scripts'] = travisPrereleaseVersion
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
