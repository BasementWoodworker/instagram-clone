import styled from "styled-components";
import logOutIcon from "../../assets/icons/log-out.svg";

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 70px;
  border-bottom: 1px solid lightgrey;

  .logo {
    font-size: 40px;
    text-decoration: none;
    color: inherit;
  }

  button.log-out {
    background-color: inherit;
    border: none;
    background-image: url(${logOutIcon});
    background-size: 100%;
    height: 40px;
    width: 40px;
    cursor: pointer;
  }
`