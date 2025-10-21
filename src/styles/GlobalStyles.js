import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    --bg: #0b1220;
    --surface: #121a2a;
    --text: #e8eefb;
    --muted: #9fb0d1;
    --primary: #6ea8ff;
    --danger: #ff6b6b;
    --focus: #ffd166;
  }
  @media (prefers-color-scheme: light) {
    :root {
      --bg: #f7f8fb;
      --surface: #ffffff;
      --text: #0b1220;
      --muted: #3a4966;
      --primary: #1d4ed8;
      --danger: #b91c1c;
      --focus: #7c3aed;
    }
  }

  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { height: 100%; }
  body {
    margin: 0;
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    background: var(--bg);
    color: var(--text);
  }
  :focus-visible { outline: 3px solid var(--focus); outline-offset: 3px; }

  button { cursor: pointer; }
  input, button { font: inherit; }
`
export default GlobalStyles
