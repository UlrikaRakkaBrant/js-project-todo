// src/styles/media.js
const sizes = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  large: '1440px',
}

export const media = {
  mobile: (styles) => `@media (max-width: ${sizes.mobile}) { ${styles} }`,
  tablet: (styles) => `@media (min-width: ${sizes.tablet}) { ${styles} }`,
  desktop: (styles) => `@media (min-width: ${sizes.desktop}) { ${styles} }`,
  large: (styles) => `@media (min-width: ${sizes.large}) { ${styles} }`,
}
