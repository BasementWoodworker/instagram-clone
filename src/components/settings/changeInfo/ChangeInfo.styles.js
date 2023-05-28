import styled from "styled-components";

export const StyledChangeInfo = styled.form`
  label.avatar {
    align-items: center;
  }

  label.avatar > input {
    visibility: hidden;
    position: absolute;
  }

  label.avatar > img.avatar-preview {
    cursor: pointer;
    height: 70px;
    width: 70px;
    border: 1px solid grey;
    border-radius: 100%;
  }
`