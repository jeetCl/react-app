# Create React App [![Build & Test](https://github.com/facebook/create-react-app/actions/workflows/build-and-test.yml/badge.svg?branch=main)](https://github.com/facebook/create-react-app/actions/workflows/build-and-test.yml) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/facebook/create-react-app/blob/main/CONTRIBUTING.md)

> [!WARNING]
> ## Deprecation Notice
> 
> **Create React App (CRA) is now in maintenance mode.** While it served as the official React boilerplate for 2017-2021, the React team now recommends modern alternatives for new projects:
> 
> - **[Vite](https://vitejs.dev/)** - Next-generation frontend tooling (recommended for CRA users)
> - **[Next.js](https://nextjs.org/)** - Full-stack React framework
> - **[Remix](https://remix.run/)** - Full-stack web framework
> - **[Gatsby](https://www.gatsbyjs.com/)** - Static site generator
> 
> [Learn more about React starter recommendations](https://react.dev/learn/start-a-new-react-project)
> 
> Existing CRA projects can continue maintenance, but new features will not be added. We encourage migration to modern tools for better performance and features.

<img alt="Logo" align="right" src="https://create-react-app.dev/img/logo.svg" width="20%" />

## Quick Start (Legacy)

For educational purposes or existing maintenance, you can still create an app with:

```bash
npx create-react-app my-app
cd my-app
npm start
Requirements: Node.js >= 14.0.0 (LTS recommended)

First-time users: Uninstall any global CRA installations (npm uninstall -g create-react-app) to ensure latest version usage.

Migration Guide
Why Migrate?
Modern tooling with faster build times (ESBuild/SWC)

Built-in TypeScript support

Better code splitting

Framework features (SSR, SSG, API routes)

Migration Paths
Vite (Recommended)

bash
npm create vite@latest my-app -- --template react
Migration Guide

CRA → Vite Migration Docs

Next.js (Full-stack)

bash
npx create-next-app@latest
Remix (Full-stack)

bash
npx create-remix@latest
Maintenance Documentation
For existing CRA projects, refer to:

User Guide (Archived)

Updating Dependencies

Building for Production

Advanced Configuration

Project Structure
my-app
├── public/          # Static assets
│   ├── index.html   # Main template
│   └── manifest.json
└── src/
    ├── App.js       # Root component
    ├── index.js     # Entry point
    └── serviceWorker.js  # PWA support
Available Scripts
Command	Description
npm start	Start development server (3000)
npm test	Run interactive test watcher
npm run build	Create production build (build/ folder)
npm run eject	Irreversible exposure of config files
Contributing
While CRA is in maintenance mode, we welcome:

Security patches

Critical bug fixes

Documentation improvements

See CONTRIBUTING.md for guidelines.

## Acknowledgements

Create React App was made possible by contributions from:
- The React team
- Webpack contributors
- Babel maintainers
- Community contributors ([full list](https://github.com/facebook/create-react-app/graphs/contributors))
The active link to view all contributors is:
https://github.com/facebook/create-react-app/graphs/contributors

Licensed under MIT - © Facebook
