import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";

import { StyledHeader } from "./Header.styles";
import { noHeaderAndFooterPaths } from "../../noHeaderAndFooterPaths";
import { selectUser } from "../../redux/features/user/userSlice";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const you = useSelector(selectUser);

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
      <nav>
        <Link to="/feed" className="home" title="Feed"></Link>
        <Link to="/make-new-post" className="add-post" title="Make post"></Link>
        <Link to="/settings" className="settings" title="Settings"></Link>
        <button className="log-out" title="Log Out" onClick={handleLogOut}></button>
        <Link to={`user/${you && you.username}`} className="your-info" title="Your profile">
          <img src={you && you.photoURL} />
          <span className="username">{you && you.username}</span>
        </Link>
      </nav>
    </StyledHeader>
  )
}