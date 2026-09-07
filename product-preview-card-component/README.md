# Frontend Mentor - Product preview card component solution

This is a solution to the [Product preview card component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-preview-card-component-GO7UmttRfa). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout depending on their device's screen size
- See hover and focus states for interactive elements

### Screenshot

![](./images/screenshot.png)

### Links

- Solution URL: [See it here](https://swannjulien.github.io/FM_product-preview-card-component)

## My process

### Built with

- Semantic HTML5 markup
- BEM naming convention
- CSS custom properties
- Flexbox

### What I learned

I learned the difference between a link and a button. In this case actually it should be a `<button>` for what I understood because the function of this button is to trigger an action. In this case to add a product to the user's cart. Whereas the function of a link is to navigate within the website, to redirect the user from one page to another or to navigate inside the same page.

But I did a semantic `<a>` link instead of a `<button>` ! And learned about the ARIA button role on the same occasion.

```html
<a role="button" href="#" class="btn btn--green"</a>
```

I used custom properties for the very first time in a simple way, just declaring variables for colors and fonts. That would make this application more maintainable.

```css
:root {
  --color-primary-dark: hsl(158, 36%, 37%);
}
```

Thanks to Jonas Schmedtmann tutorial on Udemy, I learned the 62,5% trick to make 1rem = 10px which make calculation easier for layout spacing and font sizing.

```css
html {
  font-size: 62.5%;
}
```

### Continued development

- Grid layout system
- Sass preprocessor
- @keyframes
- clip-path
- More about custom properties
- Keep learning about accesibility
- and so much more !

### Useful resources

- [Article about the 62,5% rule](https://www.aleksandrhovhannisyan.com/blog/62-5-percent-font-size-trick/) - Excellent article that helped me to understand the 62,5% font-size rule.
- [Button vs link](https://www.a11y-101.com/design/button-vs-link) - A straighforward and short article on when to use a link and when to use a button.

- [Flexbox by CSS Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) - A must to bookmark guide about how to use the flexbox properties.

## Author

- Website - [Swann Julien](https://www.swannjulien.com/)
- Frontend Mentor - [@SwannJulien](https://www.frontendmentor.io/profile/SwannJulien)
