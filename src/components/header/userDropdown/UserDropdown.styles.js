import styled from "styled-components";

export const StyledUserDropdown = styled.div`
  padding: 8px;

  &:hover {
    
  }

  img.avatar {
    height: 50px;
    border: 1px solid grey;
    border-radius: 100%;
    margin: 0 10px;
  }

  .down-arrow {
    color: lightgrey;
    font-size: 30px;
  }

  .options {
    z-index: ${({ showDropdown }) => showDropdown ? 10 : -1};
    position: absolute;
    padding: 8px;
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    background-color: white;
  }
`