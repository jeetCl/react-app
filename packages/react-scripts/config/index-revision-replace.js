"use strict"

const fs = require('fs')
const path = require('path')
const { createHash } = require('crypto');

class IndexRevision {

  apply(compiler) {
    compiler.hooks.done.tap('IndexRevisionReplace', () => {
      const builtServiceWorkerPath = path.resolve('build/service-worker.js')
      const _indexHtmlPath = path.resolve('build/_index.html')

      const _indexSrcCode = fs.readFileSync(_indexHtmlPath, 'utf-8')
      const _indexHashRaw = md5(_indexSrcCode)
      const _indexHashAsString = `"${_indexHashRaw}"`
      
      let serviceWorkerCode = fs.readFileSync(builtServiceWorkerPath, 'utf-8')
      serviceWorkerCode = serviceWorkerCode.replace('self._INDEX_HASH', _indexHashAsString)

      fs.writeFileSync(builtServiceWorkerPath, serviceWorkerCode)
    })
  }

}

function md5(input) {
  const hash = createHash('md5')
  return hash.update(input, 'utf-8').digest('hex')
}

module.exports = IndexRevision
