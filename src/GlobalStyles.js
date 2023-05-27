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

  #root > .entry-page {
    width: min-content;
    margin: auto;
  }

  #root > .after-logging-in {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100%;
  }


`