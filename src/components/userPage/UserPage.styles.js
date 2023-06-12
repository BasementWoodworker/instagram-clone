import styled from "styled-components";

export const StyledUserPage = styled.div`
  margin: 30px auto;

  max-width: 1000px;

  .avatar {
    height: 140px;
    width: 140px;
    border-radius: 50%;
  }

  button.follow {
    cursor: pointer;
    color: white;
    background-color: #1a62ce;
    font-size: 18px;
    padding: 4px 12px;
    border: none;
    border-radius: 4px;
  }

  .change-displayed-content {
    display: flex;
    gap: 15px;
    margin-top: 15px;
  }

  .change-displayed-content > button {
    display: flex;
    gap: 4px;
    cursor: pointer;
    border: none;
    background: none;
    font-size: 18px;
  }

  .separator-line {
    height: 1px;
    background-color: grey;
    margin: 40px 0;
  }

  .posts {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 40px;
  }

  .loading-spinner {
    display: block;
    margin: 100px auto;
  }

  .user-not-found {
    font-size: 5vw;
    color: dimgrey;
    margin: 100px;
    white-space: nowrap;
  }
`