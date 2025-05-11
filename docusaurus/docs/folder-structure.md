---
id: folder-structure
title: Folder Structure
---

After creation, your project should look like this:

```
MY-APP/
  node_modules/
  public/
    vite.svg
  src/
    assets/
      react.svg
    App.css
    App.jsx
    index.css
    main.jsx
  .gitignore
  eslint.config.js
  index.html
  package-lock.json
  package.json
  README.md
  vite.config.js
```

In a default React project created using npm create vite@latest my-app -- --template react, the minimal set of files required for the project to build and run the basic React application structure are:

index.html (in the project root):

Required. This is the main entry point for both the development server and the production build. Vite uses this HTML file to load your application's JavaScript bundle.
It contains the basic HTML structure and, crucially, a <script type="module" src="/src/main.jsx"> (or .tsx for TypeScript) tag that points to your JavaScript/React entry file.
You cannot delete this file. You can modify its content (add meta tags, change title, etc.), but the structure including the script tag is essential.
src/main.jsx (or src/main.tsx):

Required. This is the JavaScript/TypeScript entry file where your React application is bootstrapped.
It's typically responsible for importing the main App component (or whatever your root component is) and using ReactDOM.createRoot (or ReactDOM.render for older React versions) to render that component into a specific DOM element in your index.html (usually an element with id="root").
You cannot delete this file, but you can rename it. If you rename it, you must update the src attribute of the <script> tag in your index.html file to point to the new file path.
What about src/App.jsx and other files?

src/App.jsx (or src/App.tsx):

Required by the default template, but not strictly required by Vite or React as long as some root component is rendered by main.jsx.
In the default setup, main.jsx imports and renders App.jsx. So, for the template to work out-of-the-box, App.jsx (or the file providing the component imported in main.jsx) is necessary.   
You can delete or rename App.jsx, but if you do, you must provide your own root component file and update the import path in src/main.jsx accordingly.
src/index.css, src/App.css, src/assets/ directory, etc.:

These are not required for the basic React/Vite build process itself. They are part of the default template's styling and assets.
You can delete or rename these files and the assets directory.   
Important: If you delete them, make sure you also remove any corresponding import statements in your .jsx/.tsx files (like import './index.css' in main.jsx or import './App.css' in App.jsx), otherwise your build might fail due to missing modules.
In summary:

index.html is the absolutely essential entry point.
src/main.jsx (or .tsx) is the essential JavaScript/React bootstrapping file linked by index.html.
src/App.jsx (or .tsx) is required for the default template to function, but can be replaced by your own root component if you update the import in main.jsx.
Other files like CSS and assets are part of the default content and can be removed as long as you clean up the imports.

Sources and related content

If you have Git installed and your project is not part of a larger repository, then a new repository will be initialized resulting in an additional top-level `.git` directory.
