import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";

import { StyledHeader } from "./Header.styles";
import { noHeaderAndFooterPaths } from "../../noHeaderAndFooterPaths";
import { selectUser } from "../../redux/features/user/userSlice";

export function Header() {
  const [hidden, setHidden] = useState(false);
  const scrollPosition = useRef(0);
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const you = useSelector(selectUser);

  useEffect(() => {
    function hideOnScroll() {
      const newScrollPosition = window.scrollY
      if (scrollPosition.current < newScrollPosition) setHidden(true)
      else setHidden(false)
      scrollPosition.current = newScrollPosition;
    }
    window.addEventListener("scroll", hideOnScroll);
    return () => window.removeEventListener("scroll", hideOnScroll);
  })

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

  if (noHeaderAndFooterPaths.includes(location)) return null;

  return(
    <StyledHeader className={hidden ? "hidden" : ""}>
      <a href="/" className="logo">Fakestagram</a>
      <nav>
        <Link to="/feed" className="home" title="Feed" reloadDocument></Link>
        <Link to="/make-new-post" className="add-post" title="Make post"></Link>
        <Link to="/settings" className="settings" title="Settings"></Link>
        <button className="log-out" title="Log Out" onClick={handleLogOut}></button>
        <Link to={you?.username ? "/user/" + you.username : "#"} className="your-info" title="Your profile">
          <img src={you && you.photoURL} />
          <span className="username">{you && you.username}</span>
        </Link>
      </nav>
    </StyledHeader>
  )
}