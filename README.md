# noflo-gravatar

Gravatar components for [NoFlo](https://noflojs.org)

## Components

- `gravatar/GetAvatar` — builds the Gravatar avatar URL for an email address

## Usage

Components are discovered automatically by NoFlo 2.x on Node.js. Wire `gravatar/GetAvatar` into your graph and send an email address to the `email` port:

- `email` (string): email address to hash into a Gravatar avatar URL
- `size` (int, control, default `200`): desired avatar size in pixels
- `avatar` (string output): HTTPS URL of the Gravatar avatar

Example in FBP:

```
'https://s.gravatar.com' -> AVATAR Gravatar(gravatar/GetAvatar)
'henri.bergius@iki.fi' -> EMAIL Gravatar
```

## Development

Install dependencies and run the test suite:

```
npm ci
npm test
```
