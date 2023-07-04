import styled from "styled-components";
import { Link } from "react-router-dom";

const borderRadius = "4px";

export const StyledUserPreviewLink = styled(Link)`
  position: relative; // To contain skeleton animation within
  display: flex;
  align-items: center;
  gap: 10px;
  text-overflow: ellipsis;
  text-decoration: none;
  color: inherit;
  background-color: #e4e4e4;
  padding: 10px;
  border-radius: ${borderRadius};
  width: 100%;
  min-width: 250px;

  &.skeleton::before {
    border-radius: ${borderRadius};
  }

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
    font-size: 20px;
    white-space: nowrap;
  }

  .full-name {
    color: dimgrey;
    white-space: nowrap;
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