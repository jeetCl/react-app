'use strict';

const path = require('path');
const fs = require('fs');
const globAll = require('glob-all');
const loaderUtils = require('loader-utils');

function enumerateLangs(dir) {
  return fs.readdirSync(dir).filter(function(file) {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });
}

//https://github.com/jpillora/node-glob-all#usage
function findAll(globs, cwd) {
  const globArray = Array.isArray(globs) ? globs : [globs];
  return globAll.sync(globArray, { cwd, realpath: true });
}
const i18nextImport = 'import i18n from "i18next";';
const mainExport = 'export default {}';
const createDynamicImport = ns =>
  `
    i18n.on('languageChanged', function(lng) {
      import(\`./\${lng}/${ns}\`)
        .then(({ default: d }) => {
          i18n.addResources(lng, "${ns}", d)
        })
        .catch(e =>
          console.error(
            \`failed to load translation - \${lng}" + "${ns}"\`
          )
        );

      import(\`./en/${ns}\`)
        .then(({ default: d }) => {
          i18n.addResources("en", "${ns}", d)
        })
        .catch(e => {
          console.error("failed to load translation - en" + "${ns}")});
    });`;

module.exports = function(source) {
  if (this.resource.endsWith('.json')) {
    return source;
  }

  this.cacheable && this.cacheable();
  const options = loaderUtils.getOptions(this) || {};

  if (!options.include) {
    options.include = ['**/*.json', '**/*.yml', '**/*.yaml'];
  }

  if (!options.overrides) {
    options.overrides = [];
  }
  const appLocalesDir = path.dirname(this.resource); // this is the absolute path to the index.js in the top level locales dir
  if (!fs.existsSync(appLocalesDir)) {
    throw new Error(
      'Directory does not exist: ' +
        appLocalesDir +
        ' for resource: ' +
        this.resource
    );
  }

  if (options.debug) {
    console.info(
      'Bundling locales from ' +
        appLocalesDir +
        ' (ordered least specific to most):'
    );
  }
  const namespaces = [];
  // needs to be ordered in least specialized to most e.g. lib locale -> app locale
  const moduleLocalesDirs = options.overrides.map(override => {
    if (path.isAbsolute(override)) {
      return override;
    } else {
      return path.join(appLocalesDir, override);
    }
  });
  moduleLocalesDirs.push(appLocalesDir);
  moduleLocalesDirs.forEach(localesDir => {
    // all subdirectories match language codes
    const langs = enumerateLangs(localesDir);
    for (let i = 0; i < langs.length; i++) {
      const lang = langs[i];
      const resBundle = {};
      resBundle[lang] = {};

      const fullLangPath = path.join(localesDir, lang);
      this.addContextDependency(fullLangPath);

      const langFiles = findAll(options.include, fullLangPath);
      for (let j = 0; j < langFiles.length; j++) {
        const fullPath = langFiles[j];
        this.addDependency(fullPath);
        if (options.debug) {
          console.info('\t' + fullPath);
        }

        const extname = path.extname(fullPath);

        let namespace = 'translation';
        if (options.basenameAsNamespace || options.relativePathAsNamespace) {
          let namespaceFilepath;
          if (options.relativePathAsNamespace) {
            namespaceFilepath = path.relative(
              path.join(localesDir, lang),
              fullPath
            );
          } else if (options.basenameAsNamespace) {
            namespaceFilepath = path.basename(fullPath);
          }
          namespace = namespaceFilepath.replace(extname, '').split(path.sep)[0];
          namespaces.push(namespace);
        }
      }
    }
  });
  const returnSource = [...new Set(namespaces)].map(ns =>
    createDynamicImport(ns)
  );

  return i18nextImport + returnSource.join('') + mainExport;
};
