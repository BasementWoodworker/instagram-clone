import styled from "styled-components";

import yellow_black_stripes from "../../assets/images/yellow-black-stripes.png";

const blue = "#54acff";

export const StyledEntryPage = styled.div`
  display: flex;
  margin: auto;

  button {
    cursor: pointer;
  }

  img.greeting-image {
    height: 400px;
    border-radius: 20px;
    margin-right: 40px;
  }

  .right-side {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  h1 {
    margin-bottom: 20px;
    text-align: center;
  }

  form,
  .change-action {
    background-color: white;
    border: 1px solid lightgrey;

  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
    width: 300px;
    padding: 20px 40px;
  }

  label {
    position: relative;
    width: 100%;
  }

  input {
    font-size: 14px;
    height: 35px;
    width: 100%;
    padding-top: 12px;
    padding-left: 7px;
    padding-right: 7px;
  }

  input:placeholder-shown {
    font-size: 16px;
    padding: 8px;
  }

  input + span {
    position: absolute;
    top: 2px;
    left: 10px;;
    color: grey;
    transition: 0.1s;
    font-size: 12px;
  }

  input:placeholder-shown + span {
    top: 8px;
    font-size: 16px;
  }

  button[type="submit"] {
    color: white;
    background-color: ${blue};
    border: none;
    border-radius: 8px;
    padding: 5px;
    margin: 10px;
    font-size: 18px;
    width: 100%;
  }
  
  button[type="submit"]:active {
    transform: scale(0.98);
  }

  .change-action {
    text-align: center;
    padding: 12px;
    margin-top: 10px;
  }

  .change-action > a {
    color: ${blue};
    text-decoration: none;
    margin-left: 4px;
    font-weight: bold;
  }

  .error-message {
    color: #ff4229;
  }

  .enter-without-registration {
    border: 1px solid black;
    font-size: 21px;
    font-weight: bold;
    background-image: url(${yellow_black_stripes});
    margin-top: 10px;
    padding: 8px;
    background-size: contain;
  }
`