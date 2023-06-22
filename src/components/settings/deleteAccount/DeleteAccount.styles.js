import styled from "styled-components";

export const StyledDeleteAccount = styled.form`
  p {
    font-size: 24px;
    text-align: center;
  }

  button.delete-account {
    color: white;
    background-color: #ff4242;
    font-size: 32px;
    padding: 10px 30px;
  }

  @media (max-width: 600px) {
    button.delete-account {
      font-size: 24px;
      padding: 10px 20px;
    }
  }
`