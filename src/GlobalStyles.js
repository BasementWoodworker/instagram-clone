import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
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

  #root > header {
    position: sticky;
    top: 0;
    z-index: 10;
  }

  #root > main {
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    background-color: #f5f5f5;
  }
`