import React from "react";
import { Link } from "react-router-dom";

import { StyledHeaderOptionsDropdown } from "./HeaderOptionsDropdown.styles";

export function HeaderOptionsDropdown() {
  return(
    <StyledHeaderOptionsDropdown>
      <Link to="/settings">Your Profile</Link>
      <Link to="/settings">Settings</Link>
    </StyledHeaderOptionsDropdown>
  )
}