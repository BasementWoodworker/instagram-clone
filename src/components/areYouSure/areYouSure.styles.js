import styled from "styled-components";

export const StyledAreYouSure = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
  background-color: rgba(122, 122, 122, 0.5);

  .container {
    position: relative;
    top: 50%;
    margin: auto;
    transform: translate(0, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    width: min-content;
    background-color: white;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid grey;
    text-align: center;
  }

  .buttons {
    display: flex;
    gap: 10px;
  }
  
  button {
    color: white;
    font-size: 18px;
    padding: 4px;
    border: none;
    border-radius: 7px;
  }

  button.yes {
    background-color: green;
  }

  button.no {
    background-color: orangered;
  }

  .error-message {
    color: red;
  }
`