# Kasa React App

## Report

### Project initialization, using Typescript and Vite

```
$ npm create vite@latest kasa-app -- --template react-ts
$ cd kasa-app
$ npm install
$ npm install react-router-dom
$ npm install -D @types/react-router-dom
$ npm install -D @types/node
$ npm install sass -D
```

---

### Formatter settings

[`kasa-app -> .vscode -> settings.json`](./.vscode/settings.json)  
[`kasa-app -> .prettierrc`](./.prettierrc)

---

### Router

#### Router component

[`kasa-app -> src -> components -> KasaRouter`](./src/components/KasaRouter.tsx)

#### Router pages

`/` -> [`Home`](./src/pages/Home.tsx)  
`/about-us` -> [`About`](./src/pages/About.tsx)  
`/housing-sheets` -> [`HousingSheets`](./src/pages/HousingSheets.tsx)  
`/*` -> [`NotFound`](./src/pages/NotFound.tsx)

---

### Navbar

[`kasa-app -> src -> components -> KasaNavbar`](./src/components/KasaNavbar.tsx)

#### i18n

[`kasa-app -> src -> i18n`](./src/i18n/)

#### Examples of i18n implementation use cases

- [`kasa-app -> src -> config -> NavData`](./src/config/NavData.ts)
- [`kasa-app -> src -> pages -> NotFound`](./src/pages/NotFound.tsx)

---
