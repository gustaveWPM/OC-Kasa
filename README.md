# Kasa's React App

## You have ever done a web application with React?

I didn't either...  
This is my first webapp made with React.

Project made during an _OpenClassrooms_ bootcamp.  
[Learning path: _Développeur Web_](https://openclassrooms.com/fr/paths/717-developpeur-web)

**"Raw React" project.**  
**No React library allowed.**

### Implemented features

#### (_Despite the fact that villains "educators" tried to make me build a crappy app by forbidding me to use libs... Boo that!_)

- Rescue mechanisms based on the Damerau-Levenshtein distance to redirect to the right page or suggest a corresponding page possibility for a URL
  (typed with typos or incomplete)

  - [https://oc-kasa-lyart.vercel.app/abou](https://oc-kasa-lyart.vercel.app/abou)
  - [https://oc-kasa-lyart.vercel.app/bauo-tsu](https://oc-kasa-lyart.vercel.app/bauo-tsu)
  - [https://oc-kasa-lyart.vercel.app/about](https://oc-kasa-lyart.vercel.app/about)
  - [https://oc-kasa-lyart.vercel.app/about-su](https://oc-kasa-lyart.vercel.app/about-su)
  - [https://oc-kasa-lyart.vercel.app/abuot-su](https://oc-kasa-lyart.vercel.app/abuot-su)
  - [https://oc-kasa-lyart.vercel.app/abuot-us](https://oc-kasa-lyart.vercel.app/abuot-us)
  - [https://oc-kasa-lyart.vercel.app/bauot-su](https://oc-kasa-lyart.vercel.app/bauot-su)
  - [https://oc-kasa-lyart.vercel.app/housing](https://oc-kasa-lyart.vercel.app/housing)

- Dynamic database re-fetching on page first-load/change + local database caching

- Loading placeholders ("_First-load_" placeholders, "_Retrying to load_" placeholders, "_Failed to load_" placeholders, _user local cache-based_
  placeholders)

- Dark/Light theme

- i18n

  - Infers the language according to the web browser settings
  - Keeps track of the most recent language choice
  - Dynamically generates internationalized routes (`/fr/`, `/en-us/`, etc)
  - Dynamically redirects to the correct route corresponding to the language choice made either by the user or by the language inference
  - Extensible codebase (type-safe dictionnaries, dynamic API endpoint choice, typed Vocabulary Accessor, automated generators...)

- Animated accordions

  - Possibility to have only one accordion's item opened at a time (just pass several `items` to your `<Accordion>` component)
  - Possibility to bypass this previous behavior (using multiple mono-item accordions)
    - [https://oc-kasa-lyart.vercel.app/housing-sheets/c67ab8a7](https://oc-kasa-lyart.vercel.app/housing-sheets/c67ab8a7)
    - [https://oc-kasa-lyart.vercel.app/about-us](https://oc-kasa-lyart.vercel.app/about-us)

- Animated images slider + infinite loop
  - [https://oc-kasa-lyart.vercel.app/housing-sheets/0979876d](https://oc-kasa-lyart.vercel.app/housing-sheets/0979876d)
  - Also has a swiping feature (only on mobiles/tablets).

### Resources

- [Figma Mockups](https://www.figma.com/file/bAnXDNqRKCRRP8mY2gcb5p/UI-Design-Kasa-FR?node-id=3%3A0)
- [The best articles you would ever read about "Raw React"/the React's runtime](https://www.developerway.com)

#### Demo

[https://oc-kasa-lyart.vercel.app/](https://oc-kasa-lyart.vercel.app/)

### How to run this project locally

- `$ yarn start`
- (or) `$ npm start`

---

<p align="center"><em>This GitHub repository is not part of the OPENCLASSROOMS website or OPENCLASSROOMS SAS.<br>Additionally, this GitHub repository is NOT endorsed by OPENCLASSROOMS in any way.<br>OPENCLASSROOMS is a trademark of OPENCLASSROOMS, SAS.</em></p>
