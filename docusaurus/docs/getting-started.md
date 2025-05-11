---
id: getting-started
title: Getting Started
---

While Create React App is an officially supported way to create single-page React
applications, and  it offers a satisfactory build setup with no configuration, it is now recommended to use Vite.

## Quick Start

```sh
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev

Then open [http://localhost:5173/](http://localhost:5173/) to brovse your app.

When you’re ready to deploy to production:

Here's how you typically install dependencies, build the production version, and preview it locally:

Install Dependencies: (You already did this, but it's the necessary first step if you were starting fresh or just cloned the repo).

```sh
npm install
```
# or
```sh
yarn install
```
# or
```sh
pnpm install
```
Build the Production Version:
This command triggers Vite to bundle and optimize your application's code and assets for production deployment.

```sh
npm run build
```
# or
```sh
yarn build
```
# or
```sh
pnpm run build
```
What this does: Vite uses Rollup under the hood to bundle your code into highly optimized static files (HTML, CSS, JavaScript, assets). It performs minification, tree-shaking (removing unused code), and other optimizations to ensure the smallest possible file sizes and fastest loading times.
Output: By default, the generated production files will be placed in a dist (or build) directory in the root of your project. This dist folder contains everything you need to deploy your application.
Serve/Preview the Production Build Locally:
You generally cannot just open the index.html file inside the dist folder directly in your browser. This is because modern Single Page Applications (SPAs) rely on a web server to handle routing and correctly serve the index.html file for various URLs.

Vite provides a simple command to spin up a local static server specifically for testing your production build:

```sh
npm run preview
```
# or
```sh
yarn preview
```
# or
```sh
pnpm run preview
```
What this does: This command starts a minimal HTTP server that serves the static files directly from your dist directory. This allows you to test the built version of your app locally before deploying it.
Important: The npm run preview command is only for previewing the build locally. It is not designed for production use or handling high traffic.
Deploy to Production:
For actual production deployment, you need a static file hosting service or a web server configured to serve static files. You would take the entire contents of the dist folder and upload them to your hosting provider.

Common production hosting options for Vite SPAs include:

Static Hosting Services: Netlify, Vercel, Surge, GitHub Pages, GitLab Pages, Cloudflare Pages. These services are often zero-configuration for Vite apps.
Cloud Storage + CDN: AWS S3 + CloudFront, Azure Blob Storage + CDN, Google Cloud Storage + Cloud CDN.
Traditional Web Servers: Nginx, Apache, Caddy (configured to serve static files from the dist folder and often with a fallback to index.html for client-side routing).
Azure Static Web Apps (specifically designed for hosting static sites like Vite apps).
In summary:

Use npm run build to create the optimized static files (in the dist folder).
Use npm run preview to serve those built files locally for testing purposes.
Deploy the contents of the dist folder to a dedicated static hosting service or web server for production.

## Creating an App in a less efficient way, without using Vite

**You’ll need to have Node >= 14 on your local development machine** (but it’s not required on the server). You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to switch Node versions between different projects.

To create a new app, in a less efficient way, without using Vite, you may choose one of the following methods:

### npx

```sh
npx create-react-app@latest my-app
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_

### npm

```sh
npm init react-app my-app
```

_`npm init <initializer>` is available in npm 6+_

### Yarn

```sh
yarn create react-app my-app
```

_`yarn create` is available in Yarn 0.25+_

### Selecting a template

You can now optionally start a new app from a template by appending `--template [template-name]` to the creation command.

If you don't select a template, we'll create your project with our base template.

Templates are always named in the format `cra-template-[template-name]`, however you only need to provide the `[template-name]` to the creation command.

```sh
npx create-react-app my-app --template [template-name]
```

> You can find a list of available templates by searching for ["cra-template-\*"](https://www.npmjs.com/search?q=cra-template-*) on npm.

Our [Custom Templates](custom-templates.md) documentation describes how you can build your own template.

#### Creating a TypeScript app

You can start a new TypeScript app using templates. To use our provided TypeScript template, append `--template typescript` to the creation command.

```sh
npx create-react-app my-app --template typescript
```

If you already have a project and would like to add TypeScript, see our [Adding TypeScript](adding-typescript.md) documentation.

### Selecting a package manager

When you create a new app, the CLI will use [npm](https://docs.npmjs.com) or [Yarn](https://yarnpkg.com/) to install dependencies, depending on which tool you use to run `create-react-app`. For example:

```sh
# Run this to use npm
npx create-react-app my-app
# Or run this to use yarn
yarn create react-app my-app
```

## Output

Running any of these commands will create a directory called `my-app` inside the current folder. Inside that directory, it will generate the initial project structure and install the transitive dependencies:

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── serviceWorker.js
    └── setupTests.js
```

No configuration or complicated folder structures, only the files you need to build your app. Once the installation is done, you can open your project folder:

```sh
cd my-app
```

## Scripts

Inside the newly created project, you can run some built-in commands:

### `npm start` or `yarn start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make changes to the code. You will see the build errors and lint warnings in the console.

<p align='center'>
<img src='https://cdn.jsdelivr.net/gh/marionebl/create-react-app@9f6282671c54f0874afd37a72f6689727b562498/screencast-error.svg' width='600' alt='Build errors' />
</p>

### `npm test` or `yarn test`

Runs the test watcher in an interactive mode. By default, runs tests related to files changed since the last commit.

[Read more about testing](running-tests.md).

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed.
