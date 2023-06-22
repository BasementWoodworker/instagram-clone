import styled from "styled-components";

export const StyledUploadImage = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: min(100%, 500px);
  width: min(100%, 500px);
  box-shadow: 0 0 12px lightgrey;
  background-color: white;
  margin-top: 50px;

  input[type="file"] {
    height: 100%;
    width: 100%;
    display: none;
  }

  .upload-icon {
    max-width: 50%;
  }

  .text {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
  }

  @media (max-height: 400px) {
    margin: 0;
  }
`