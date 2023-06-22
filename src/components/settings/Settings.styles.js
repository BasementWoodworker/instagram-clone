import styled from "styled-components";
const borderRadius = "8px";

export const StyledSettings = styled.div`
  display: flex;
  width: 70%;
  margin: 100px auto;
  background-color: white;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: ${borderRadius};

  .setting-selection {
    border-right: 1.5px solid ${props => props.theme.borderColor};
    display: flex;
    flex-direction: column;
  }

  .setting-selection > * {
    flex-grow: 1;
    font-size: 24px;
    border-bottom: 1px solid ${props => props.theme.borderColor};
    padding: 20px 12px;
    cursor: pointer;
  }

  .setting-selection > *:hover {
    background-color: #eeeeee;
  }

  .setting-selection > *:first-child {
    border-top-left-radius: ${borderRadius};
  }

  .setting-selection > *:last-child {
    border-bottom: none;
    border-bottom-left-radius: ${borderRadius};
  }

  .setting-selection > .selected {
    color: ${props => props.theme.darkblue};
    background-color: #eeeeee;
  }

  form.setting {
    display: flex;
    flex-direction: column;
    margin: auto;
    padding: 15px;
    max-width: 100%;
  }

  form.setting > * {
    margin: 4px;
  }

  form.setting > label > * {
    margin: 4px;
  }

  form.setting > label > span {
    font-size: 15px;
    color: grey;
  }
  
  form.setting > h2.setting-type {
    color: ${props => props.theme.darkblue};
    font-size: 32px;
    margin-bottom: 8px;
  }

  form.setting > label {
    display: flex;
    flex-direction: column;
  }

  form.setting > label > input[type="text"],
  form.setting > label > input[type="email"],
  form.setting > label > input[type="password"] {
    margin-top: 0;
    font-size: 18px;
    padding: 4px;
    border-radius: 4px;
    border: 1px solid #6b6b6b;
  }

  button[type="submit"] {
    width: min-content;
    align-self: center;
    cursor: pointer;
    white-space: nowrap;
    padding: 4px 10px;
    font-size: 18px;
    color: white;
    background-color: ${props => props.theme.darkblue};
    border: none;
    border-radius: 4px;
  }

  form.setting > button[type="submit"]:active {
    transform: scale(0.95);
  }

  .message {
    text-align: center;
  }

  .message.error {
    color: red;
  }

  .message.success {
    color: green;
  }

  .loading-spinner {
    align-self: center;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    margin: 5px 0;
    width: 100%;

    h2.setting-type {
      text-align: center;
    }
    
    .setting-selection {
      border-right: 0;
    }

    .setting-selection > *:first-child {
      border-top-right-radius: ${borderRadius};
    }

    .setting-selection > *:last-child {
      border-bottom: 1.5px solid ${props => props.theme.borderColor};
      border-bottom-left-radius: 0;
    }

    form.setting {
      width: 100%;
      box-shadow: inset 0 0 10px 5px gainsboro;
    }
  }

  @media (max-height: 550px) {
    margin: 0 auto;
  }
`