import React from "react";
import { useLocation } from "react-router-dom";

import { StyledFooter } from "./Footer.styles";
import { noHeaderAndFooterPaths } from "../../noHeaderAndFooterPaths";

export function Footer() {
  const location = useLocation().pathname;
  if (noHeaderAndFooterPaths.includes(location)) return null;

  return(
    <StyledFooter>
      
    </StyledFooter>
  )
}