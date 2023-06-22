import styled from "styled-components";

export const StyledUserPage = styled.div`
  margin: 30px auto;
  width: 100%;
  max-width: 1000px;

  .user-info {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    align-items: center;
    margin: 0 10px;
  }

  .avatar {
    height: 140px;
    width: 140px;
    border-radius: 50%;
  }

  .username {
    font-weight: normal;
    font-size: 32px;
  }

  .full-name {
    color: dimgrey;
    font-size: 18px;
    text-indent: 2px;
  }

  button.follow {
    cursor: pointer;
    color: white;
    background-color: ${props => props.theme.darkblue};
    font-size: 18px;
    padding: 4px 12px;
    border: none;
    border-radius: 4px;
  }

  .change-displayed-content {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 15px;
  }

  .change-displayed-content > button {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 4px;
    cursor: pointer;
    border: none;
    background: none;
    font-size: 18px;
  }

  .separator-line-profile {
    height: 1px;
    background-color: ${props => props.theme.borderColor};
    margin: 40px 0;
  }

  .posts {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 40px;
  }

  .loading-spinner {
    margin: 100px auto;
  }

  .user-not-found {
    font-size: 5vw;
    color: dimgrey;
    margin: 100px;
    white-space: nowrap;
  }

  .no-followers,
  .no-following {
    color: dimgrey;
    font-size: 32px;
    text-align: center;
  }

  @media (max-width: 600px) {
    margin: 10px auto;

    .user-info {
      grid-template-columns: 1fr 1fr 10px;
    }

    .avatar {
      height: 100px;
      width: 100px;
    }

    .separator-line-profile {
      margin: 20px 0;
    }

    .change-displayed-content > button > span {
      font-size: 15px;
    }

    .posts {
      gap: 5px;
    }

    .separator-line {
      margin-top: 15px;
      margin-bottom: 10px;
    }
  }
`