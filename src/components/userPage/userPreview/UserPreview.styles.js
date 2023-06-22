import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledUserPreviewLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-overflow: ellipsis;
  text-decoration: none;
  color: inherit;
  background-color: #e4e4e4;
  padding: 10px;
  border-radius: 4px;
  width: 200px;

  &:hover {
    background-color: #d1d1d1;
  }

  img {
    height: 45px;
    width: 45px;
    border-radius: 50%;
  }

  .username {
    font-weight: bold;
  }

  .full-name {
    color: dimgrey;
  }

  button.remove {
    color: white;
    background-color: ${props => props.theme.darkblue};
    border: none;
    border-radius: 4px;
    padding: 4px;
    margin-right: 4px;
  }
`