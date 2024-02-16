'use strict'

const path = require('path')

const reactScriptPath = path.join(__dirname, 'packages/react-scripts')

const { alterPackageJsonFile, getTravisPrereleaseVersion } = require(path.join(
  reactScriptPath,
  'scripts/utils/frontierInit'
))
const { runExternalCommandSync } = require(path.join(reactScriptPath, 'scripts/utils/osUtils'))

let originalVersion
let newVersion

alterPackageJsonFile(reactScriptPath, packageJson => {
  originalVersion = packageJson.version
  newVersion = getTravisPrereleaseVersion(packageJson.version)
  console.log(`setting @fs/react-scripts version to "${newVersion}" temporarily to get published`)
  packageJson.version = newVersion
  return packageJson
})

runExternalCommandSync('npm', ['run', 'fs-publish', '--', '--allow-earlier-version'], { cwd: reactScriptPath })

alterPackageJsonFile(reactScriptPath, packageJson => {
  packageJson.version = originalVersion
  console.log(`setting @fs/react-scripts version back to "${originalVersion}"`)
  return packageJson
})

const tmpDir = `${process.env.HOME}/tmp`

runExternalCommandSync('mkdir', ['-p', tmpDir])
runExternalCommandSync(
  'npx',
  [
    'create-react-app',
    'fresh-cra-template',
    '--use-npm',
    '--scripts-version',
    `@fs/react-scripts@${newVersion}`,
    '--template',
    '@fs/cra-template',
  ],
  { cwd: tmpDir }
)
