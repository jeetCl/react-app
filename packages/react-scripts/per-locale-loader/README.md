# Language-specific loading

Looking at third party plugins for i18next, there wasn't an option for per-locale bundling so we built our own.

## Coalesce All Locales

When you run `npm run build` or `npm start`, we coalesce all translation strings per locale and namespace. So if your app supports 30 locales and there's a `translation` namespace and a `common-ui` namespace, you'll have a directory for each locale with a `translation.json` and `common-ui.json` file in each.

1. Coalesce locales before webpack compiles
2. use `per-locale-loader` inside `react-scripts` which makes the `/locales/index.js` just contain `export default {}` to make it inert since we load the locales differently
3. Add alias for `/coalesced-locales` to point to the coalesced locales inside `/src/locales/dist`
4. In dev mode, the `/src/locales` directory is watched to run the coalesce function again which will kick off another compilation and hmr

Note: This breaking change also requires a change in `zion-locale` which loads the coalesced locales dynamically from `/coalesced-locales`
