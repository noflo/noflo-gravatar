# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Changed

- Package renamed to @noflo/gravatar; the version resets to the 2.x generation (2.0.0-alpha.1) for the fresh package name. Component addressing is unchanged — library IDs derive identically from the scoped name, so component and graph names stay the same. The old noflo-gravatar will be deprecated with a pointer once 2.x reaches stable

- Migrated to NoFlo 2.x: components now depend on `@noflo/noflo` ^2.0.0 instead of the unscoped `noflo` 1.x package
- Package is now plain ESM (`"type": "module"`) with no build step; supported runtime is Node.js >= 22
- `GetAvatar` now produces Gravatar SHA-256 avatar URLs using the Web-standard `crypto.subtle`, making the component multiplatform (Node, Deno, Bun, browser). This is a breaking URL change: SHA-256 URLs serve the same avatar as the legacy MD5 form but the URL string differs
- Test suite now runs with `@noflo/fbp-spec-runner` in-process instead of the `fbp-spec` WebSocket runtime setup; added cases for custom avatar size and email normalization
- CI moved to GitHub Actions with Node.js 22/24; publishing uses OIDC trusted publishing instead of an `NPM_TOKEN` secret
