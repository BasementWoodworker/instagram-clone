import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { StyledUserDropdown } from "./UserDropdown.styles";
import { selectUser } from "../../../redux/features/user/userSlice";

export function UserDropdown() {
  const [showDropdown, setShowDropdown] = useState(false);
  const user = useSelector(selectUser);
  const userAvatar = (user && user.photoURL) ?? "";
  const username = (user && user.username) ?? "";

  return(
    <StyledUserDropdown className="user-dropdown" showDropdown={showDropdown} onMouseOver={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
      <img className="avatar" src={userAvatar} />
      <span className="down-arrow">⇩</span>
      <div className="options">
        {user !== null ? <Link to={`user/${username}`}>Your Profile</Link> : null}
        <Link to="/settings">Settings</Link>
      </div>
    </StyledUserDropdown>
  )
}