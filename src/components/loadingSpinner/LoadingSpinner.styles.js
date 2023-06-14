import styled from "styled-components";

export const StyledLoadingSpinner = styled.img`
  display: block; // To make "margin: auto" work
  height: ${(props) => props.size};
  width: ${(props) => props.size};
`