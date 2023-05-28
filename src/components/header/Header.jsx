import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { StyledHeader } from "./Header.styles";
import { UserDropdown } from "./userDropdown/UserDropdown";


export function Header() {
  const navigate = useNavigate();

  function handleLogOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("LogOut success");
        navigate("/");
      })
      .catch(error => {
        console.log("LogOut error", error);
      })
  }

  return(
    <StyledHeader>
      <h1>Fake Instagram</h1>
      <button className="log-out" title="Log Out" onClick={handleLogOut}></button>
      <UserDropdown />
    </StyledHeader>
  )
}