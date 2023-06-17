import styled from "styled-components";

import uploadIcon from "../../../../assets/icons/upload-image.svg";

export const StyledUploadImage = styled.label`
  position: relative;
  display: block;
  cursor: pointer;
  height: 400px;
  width: 400px;
  max-width: 100%;
  margin: 100px auto;
  box-shadow: 0 0 12px lightgrey;
  background-color: white;
  background-image: url(${uploadIcon});
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;

  input[type="file"] {
    height: 100%;
    width: 100%;
    visibility: hidden;
  }

  span {
    position: absolute;
    bottom: 70px;
    left: 50%;
    transform: translate(-50%);
    font-size: 24px;
    white-space: nowrap;
  }
`