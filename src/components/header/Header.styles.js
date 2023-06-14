import styled from "styled-components";
import logOutIcon from "../../assets/icons/log-out.svg";
import addPostIcon from "../../assets/icons/add-post.svg";
import settingsIcon from "../../assets/icons/settings.svg";
import homeIcon from "../../assets/icons/home.svg";

export const StyledHeader = styled.header`
  flex: 0 0 65px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid lightgrey;

  .logo {
    font-size: 40px;
    text-decoration: none;
    color: inherit;
  }

  nav {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  nav > * {
    cursor: pointer;
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

  button.log-out {
    height: 40px;
    width: 40px;
    background-image: url(${logOutIcon});
    background-size: 100%;
    background-color: inherit;
    border: none;
  }

  .your-info {
    display: flex;
    align-items: center;
    margin-left: 20px;
    text-decoration: none;
    color: inherit;
  }

  .your-info > img {
    height: 40px;
    width: 40px;
    border: 1px solid grey;
    border-radius: 50%;
  }

  .your-info > .username {
    font-size: 24px;
    font-weight: bold;
    margin-left: 8px;
  }
`