'use strict';
const dependencyTree = require('dependency-tree');
const jsonfile = require('jsonfile');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const chokidar = require('chokidar');

exports.coalesceLocales = paths => {
  console.time('per-locale coalesce');

  const builtLocalesDir = `${paths.appSrc}/locales/dist`;
  if (fs.existsSync(builtLocalesDir)) {
    rimraf.sync(builtLocalesDir);
  }
  fs.mkdirSync(builtLocalesDir);
  
  const index = fs.existsSync(`${paths.appSrc}/index.tsx`) ? `${paths.appSrc}/index.tsx` : `${paths.appSrc}/index.js`
  
  const list = dependencyTree.toList({
    filename: index,
    directory: paths.appPath,
    tsConfig: index.includes('.tsx') && `${paths.appPath}/tsconfig.json`,
    noTypeDefinitions: true, // optional
    nodeModulesConfig: {
      entry: 'module',
    },
    filter: p => p.includes('src') || p.includes('@fs'),
  });
  const realList = list.filter(p => p.includes('locales/index.js'));
  const allLocales = {};
  realList.forEach(p => {
    const dir = path.dirname(p);
    const locales = fs.readdirSync(dir).filter(d => !d.includes('.'));
    locales.forEach(locale => {
      const namespaces = fs
        .readdirSync(path.join(dir, locale))
        .map(d => d.split('.')[0]);
      allLocales[locale] = allLocales[locale] || {};
      namespaces.forEach(ns => {
        const strings = jsonfile.readFileSync(
          `${path.join(dir, locale, ns)}.json`
        );
        allLocales[locale][ns] = allLocales[locale][ns] || {};
        allLocales[locale][ns] = { ...allLocales[locale][ns], ...strings };
      });
    });
  });
  Object.keys(allLocales).forEach(locale => {
    fs.mkdirSync(path.join(builtLocalesDir, locale));
    Object.keys(allLocales[locale]).forEach(namespace => {
      jsonfile.writeFileSync(
        `${path.join(builtLocalesDir, locale, namespace)}.json`,
        allLocales[locale][namespace]
      );
    });
  });

  console.timeEnd('per-locale coalesce');
};

exports.watchCoalesce = paths => {
  const watcher = chokidar.watch(
    `${path.join(paths.appSrc, 'locales')}/!(dist)/*`,
    {
      ignored: 'dist',
    }
  );
  watcher.on('all', () => {
    console.log('Detected change to locales, recoalescing...');
    exports.coalesceLocales(paths);
  });
  ['SIGINT', 'SIGTERM'].forEach(function (sig) {
    process.on(sig, function () {
      watcher.close();
    });
  });

  exports.coalesceLocales(paths);
};
