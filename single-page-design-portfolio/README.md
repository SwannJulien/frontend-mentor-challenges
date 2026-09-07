# Frontend Mentor - Single-page design portfolio solution

This is a solution to the [Single-page design portfolio challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/singlepage-design-portfolio-2MMhyhfKVo). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Navigate the slider using either their mouse/trackpad or keyboard

### Screenshot

![](./Screenshot%202022-08-04%20at%2013-09-50%20Frontend%20Mentor%20Single-page%20design%20portfolio.png)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here]([https://your-live-site-url.com](https://swannjulien.github.io/single-page-design-portfolio/)

## My process

### Built with

- Mobile-first workflow
- CSS custom properties
- Semantic HTML5 markup
- Flexbox
- CSS Grid
- Utilities clases
- BEM

### Wokflow

1. Analyse well the design for mobile, tablet and laptop versions.
2. Create custom properties for font sizing, weight, family and other custom properties for the color scheme.
3. Create the different media queries breakpoints required by the design to change automatically all font properties according to user's screen size.
4. Create a bunch of utility clases for all kind of spacing: container, margin top
5. Start writing my styles with a mobile-first approach.

### What I learned

To complete this challenge I took inspiration from Kevin Powell's series of tutorials:
[Build a responsive website with HTML & CSS3](https://www.youtube.com/watch?v=h3bTwCqX4ns)

In this tutorial Kevin adopt the [CUBE](https://cube.fyi/) methodology which I didn't really follow but I found it really interesting.

I prefered to stick with [BEM](http://getbem.com/) naming convention which I feel more confortable with at the moment. But I did took in this project some of the CUBE ideas like:

- Styling as much as posssible in higher level and benefit from CSS core principles, cascade and inheritance. For example by seting up all the default font styling directly in the body.

```css
body {
  background-color: var(--clr-primary-200);
  font-family: var(--ff-body);
  font-size: var(--fs-body);
  line-height: 2.8rem;
}
```

- Having some composition clases to take control of spaces.

```html
<section class="cards | container padding-block"></section>
```

```css
.container {
  --max-width: 1110px;
  --padding: 1.6rem;

  width: min(var(--max-width), 100% - (var(--padding) * 2));
  margin-inline: auto;
}

.spacer {
  margin-top: 2em;
}

.padding-block {
  padding-block: 3rem;
}
```

- Also I created some utilities clases to set the colors of the cards.

```css
.bg-secondary-200 {
  background-color: var(--clr-secondary-200);
}
.bg-secondary-400 {
  background-color: var(--clr-secondary-400);
}
```

Some other things I learned building this project:

- For the first time in a project I used [grid system](https://css-tricks.com/snippets/css/complete-guide-grid/) which was really fun.

- Also I built the slider with [Swiper JS](https://swiperjs.com/) API. It's a very easy to use free mobile touch sliders.

### Continued development

- CUBE methodology
- Custom properties
- CSS animation

## Author

- Website - [Swann Julien ](https://swannjulien.github.io/swannjulien.com/)
- Frontend Mentor - [@SwannJulien](https://www.frontendmentor.io/profile/SwannJulien)
