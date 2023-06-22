import React from "react";
import { useLocation } from "react-router-dom";

import { StyledFooter } from "./Footer.styles";
import { noHeaderAndFooterPaths } from "../../noHeaderAndFooterPaths";

// Displayed only on mobile
export function Footer() {
  const location = useLocation().pathname;
  if (noHeaderAndFooterPaths.includes(location)) return null;

  return(
    <StyledFooter>
      <a href="/settings" className="settings" title="Settings"></a>
      <a href="/make-new-post" className="add-post" title="Make post"></a>
      <a href="/feed" className="home" title="Feed"></a>
    </StyledFooter>
  )
}