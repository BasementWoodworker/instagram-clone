import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  #root {
    display: flex;
    flex-direction: column;
  }

  #root > .entry-page {
    width: min-content;
    margin: auto;
  }

  #root > main {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    background-color: #f5f5f5;
  }
`