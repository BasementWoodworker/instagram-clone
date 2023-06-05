import styled from "styled-components";

export const StyledUserPost = styled.div`
  &.placeholder {
    background-color: lightgrey;
  }

  height: min-content;
  width: 400px;
  background-color: white;
  border: 1.5px solid darkgrey;
  border-radius: 8px;
  margin: 40px auto;
  padding: 8px;

  img.avatar {
    height: 30px;
    width: 30px;
    border: 1px solid #2b2f42;
    border-radius: 50%;
  }

  img.post-image {
    object-fit: cover;
    width: 100%;
  }

  button.like,
  button.comment {
    height: 30px;
    width: 30px;
    object-fit: cover;
  }

  button.like > img,
  button.comment > img {
    width: 100%;
  }
`