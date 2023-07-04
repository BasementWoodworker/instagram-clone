import { createGlobalStyle } from "styled-components";

const footerHeight = 50;

export const GlobalStyles = createGlobalStyle`
  @font-face {
    src: url("./assets/fonts/Roboto-Medium.ttf");
    font-family: Roboto, sans-serif;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
  }

  html,
  body {
    height: 100%;
    width: 100%; // fixes shrinking from setting "position:fixed" in UserPostModal.jsx
  }

  #root {
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }

  #root > .entry-page {
    width: min-content;
    margin: auto;
  }

  header {
    position: sticky;
    top: 0;
    z-index: 10;
  }

  #root > main {
    flex: 1 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    background-color: #f5f5f5;
    margin-bottom: ${footerHeight - 3 + "px"}; // -3px removes weird micro-gap in cropper tool on mobile
  }

  #root > footer {
    position: fixed;
    bottom: 0;
    flex: 0 0 ${footerHeight + "px"};
  }

  #root > main:not(:has(~ footer)) {
    margin-bottom: 0;
  }


  // Skeleton animation
  .skeleton::before {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    content: "";
    background: linear-gradient(90deg, white, #e2e2e2, white);
    background-size: 200%;
    animation: skeleton-animation 1s infinite reverse;
  }

  @keyframes skeleton-animation {
    from {
      background-position: -100% 0;
    }

    to {
      background-position: 100% 0;
    }
  }
  // Skeleton animation

  @media (min-width: 601px) {
    #root > main {
      margin-bottom: 0;
    }

    #root > footer {
      display: none;
    }
  }

  input:invalid:not(:placeholder-shown) {
    border: 1px solid orangered;
    outline: 1px solid orangered;
  }
`