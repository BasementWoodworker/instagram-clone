import { createGlobalStyle } from "styled-components";

const footerHeight = "50px";

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
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
    margin-bottom: ${footerHeight};
  }

  #root > footer {
    position: fixed;
    bottom: 0;
    flex: 0 0 ${footerHeight};
  }

  @media (min-width: 601px) {
    #root > main {
      margin-bottom: 0;
    }

    #root > footer {
      display: none;
    }
  }
`