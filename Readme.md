# Six Cities

## Description

Hotel search app.

# [Demo](http://six-cities-mu.vercel.app/)

## Tech stack:

- react
- typescript
- react-router-dom
- redux-toolkit
- axios
- classnames
- dayjs
- react-toastify

## Development

Use Node.js 24.15 or newer (Node.js 24 LTS is used in CI).

- `npm ci` installs the locked dependencies.
- `npm start` starts the Vite development server on port 3000.
- `npm run build` checks TypeScript and produces the production app in `build/`.
- `npm test` runs the test suite once; `npm run test:watch` watches for changes.
- `npm audit` checks all dependencies, including development tools.

The production host must serve `build/` and rewrite application routes to
`index.html` for client-side routing. The app uses Vite instead of Create React App.
Dependabot checks for updates weekly, and CI runs the dependency audit, tests and build.
