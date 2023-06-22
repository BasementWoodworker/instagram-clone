import React, { useState, useEffect } from "react";

import { StyledUserPreviewLink } from "./UserPreview.styles";
import { requestUserInfo } from "../../../reusableFunctions/requestUserInfo";
import { getUserAvatar } from "../../../reusableFunctions/getUserAvatar";
import { unFollowUser } from "../../../reusableFunctions/followFunctions";

export function UserPreview({ uid, isOnYourPage, yourId, modifyInfoAfterRemovingDeletedUserFromFollowings }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    requestUserInfo(uid).then(response => {
      setUserInfo(response);
      getUserAvatar(uid).then(avatar => {
        setUserInfo(info => ({
          ...info,
          avatar
        }))
      })
    })
  }, [])

  async function removeDeletedUser(e) {
    e.preventDefault();
    await unFollowUser(yourId, uid, true);
    modifyInfoAfterRemovingDeletedUserFromFollowings(uid);
  }

  if (!userInfo) return null;

  return(
    <StyledUserPreviewLink to={`/user/${userInfo.username}`}>
      <img src={userInfo && userInfo.avatar} />
      <div>
        <div className="username">@{userInfo.username ?? "Deleted account"}</div>
        <div className="full-name">{userInfo.fullName}</div>
      </div>
      {(!userInfo.username && isOnYourPage) && <button className="remove" onClick={removeDeletedUser}>Remove</button>}
    </StyledUserPreviewLink>
  )
}