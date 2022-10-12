import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  :root {
    --color-light-green: rgb(82, 181, 145);
    --color-dark-green: rgb(30, 105, 77);
    --color-black: rgb(25, 25, 25);
    --color-white: rgb(255, 255, 255);
    --color-grey: rgb(120, 120, 120);
    --color-light-grey: rgb(240, 240, 240);
    --color-yellow: rgb(164, 168, 50);
    --color-red: rgb(220, 20, 60);
  }

`;

export default GlobalStyle;
