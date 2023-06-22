import styled from "styled-components";
import addPostIcon from "../../assets/icons/add-post.svg";
import settingsIcon from "../../assets/icons/settings.svg";
import homeIcon from "../../assets/icons/home.svg";

// Displayed only on mobile
export const StyledFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: white;
  width: 100%;
  border-top: 1px solid lightgrey;

  & > * {
    cursor: pointer;
    background-repeat: no-repeat;
    background-position: center;
  }

  .home {
    height: 35px;
    width: 35px;
    background-image: url(${homeIcon});
    background-size: 100%;
    position: relative;
    bottom: 1px;
  }

  .add-post {
    height: 46px;
    width: 46px;
    background-image: url(${addPostIcon});
    background-size: 100%;
  }

  .settings {
    height: 40px;
    width: 40px;
    background-image: url(${settingsIcon});
    background-size: 100%;
  }
`