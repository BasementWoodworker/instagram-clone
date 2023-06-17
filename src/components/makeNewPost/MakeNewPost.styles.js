import styled from "styled-components";

export const StyledMakeNewPost = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  nav {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: white;
    border-top: 1.5px solid darkgrey;
  }

  nav > button {
    cursor: pointer;
    color: white;
    background-color: #2f5caf;
    padding: 4px 10px;
    font-size: 24px;
    border: none;
    border-radius: 4px;
    margin: 30px;
  }

  nav > .loading-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`