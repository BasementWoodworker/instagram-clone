import styled from "styled-components";
import logOutIcon from "../../assets/icons/log-out.svg";

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 70px;
  border-bottom: 1px solid lightgrey;

  button.log-out {
    background-color: inherit;
    border: none;
    background-image: url(${logOutIcon});
    background-size: 100%;
    height: 40px;
    width: 40px;
    cursor: pointer;
  }

  .user-info {
    display: flex;
    align-items: center;
  }

  .user-info > .username {
    font-size: 24px;
  }

  .user-info > img {
    height: 50px;
    border: 1px solid grey;
    border-radius: 100%;
    margin: 0 10px;
  }
`