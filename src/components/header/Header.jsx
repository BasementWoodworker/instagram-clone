import React from "react";
import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { StyledHeader } from "./Header.styles";
import { selectUser } from "../../redux/features/user/userSlice";
import defaultAvatar from "../../assets/icons/default-avatar.svg";

export function Header() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const userName = user ? user.name : "";
  const userAvatar = (user && user.photoURL) ?? defaultAvatar;

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
      <div className="user-info">
        <span className="username">{userName}</span>
        <img src={userAvatar} />
      </div>
    </StyledHeader>
  )
}