import React from "react";
import { useLocation, Link } from "react-router-dom";

import { StyledFooter } from "./Footer.styles";
import { noHeaderAndFooterPaths } from "../../noHeaderAndFooterPaths";

// Displayed only on mobile
export function Footer() {
  const location = useLocation().pathname;
  if (noHeaderAndFooterPaths.includes(location)) return null;

  return(
    <StyledFooter>
      <Link to="/settings" className="settings" title="Settings"></Link>
      <Link to="/make-new-post" className="add-post" title="Make post"></Link>
      <Link to="/feed" className="home" title="Feed" reloadDocument></Link>
    </StyledFooter>
  )
}