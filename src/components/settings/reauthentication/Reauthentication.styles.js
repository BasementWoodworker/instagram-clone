import styled from "styled-components";

export const StyledReauthentication = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
  background-color: rgba(122, 122, 122, 0.5);

  form {
    position: relative;
    top: 50%;
    margin: auto;
    transform: translate(0, -50%);
    display: flex;
    flex-direction: column;
    width: min-content;
    background-color: white;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid grey;
    text-align: center;
  }

  form > label {
    flex-grow: 1;
  }

  form > *,
  form > label > * {
    margin: 4px;
  }

  label > div {
    color: ${props => props.theme.darkblue};
    font-size: 18px;
    margin-bottom: 8px;
  }

  input {
    padding: 2px 4px;
  }

  button.close {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    color: white;
    background-color: orangered;
    font-size: 18px;
    border: none;
    border-radius: 4px;
    padding: 4px;
  }

  .message.error {
    margin: 0;
  }
`