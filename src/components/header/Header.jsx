import React from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";

import { StyledHeader } from "./Header.styles";
import { UserDropdown } from "./userDropdown/UserDropdown";
import { noHeaderAndFooterPaths } from "../../noHeaderAndFooterPaths";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  if (noHeaderAndFooterPaths.includes(location)) return null;

  function handleLogOut() {
    navigate("/login");
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("LogOut success");
      })
      .catch(error => {
        console.log("LogOut error", error);
      })
  }

  return(
    <StyledHeader>
      <Link to="/" className="logo">Fake Instagram</Link>
      <Link to="/make-new-post">Post</Link>
      <button className="log-out" title="Log Out" onClick={handleLogOut}></button>
      <UserDropdown />
    </StyledHeader>
  )
}