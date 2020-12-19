class PerLangPlugin {
  apply(compiler) {
    const allLocales = {};
    // inject a function to loaderContext so loaders can pass back info
    compiler.hooks.compilation.tap("PerLangPlugin", compilation =>
      compilation.hooks.normalModuleLoader.tap(
        "PerLangPlugin",
        (loaderContext, module) => {
          loaderContext.addLocales = ({ lang, content, namespace }) => {
            try {
              allLocales[lang] = allLocales[lang] || {};
              allLocales[lang][namespace] = allLocales[lang][namespace] || {};
              allLocales[lang][namespace] = {
                ...allLocales[lang][namespace],
                ...content
              };
            } catch (e) {
              console.log("errorrrr");
            }
          };
        }
      )
    );
    // compiler.hooks.shouldEmit.tap("MyPlugin", compilation => {
    //   // return true to emit the output, otherwise false
    //   return true;
    // });
    // at the end, generate an asset using the data
    compiler.hooks.emit.tapAsync("PerLangPlugin", (compilation, callback) => {
      const version = process.env.BUILD_VERSION;
      const appName = process.env.APP_NAME;
      const langs = Object.keys(allLocales);
      langs.forEach(lang => {
        const namespaces = Object.keys(allLocales[lang]);
        namespaces.forEach(namespace => {
          const content = JSON.stringify(allLocales[lang][namespace]);
          compilation.assets[
            `/static/locales/${appName}/${version}/${lang}/${namespace}.json`
          ] = {
            source: () => content,
            size: () => content.length
          };
        });
      });
      callback();
    });
  }
}

module.exports = PerLangPlugin;
