import React from "react";

import { StyledUserPost } from "./UserPost.styles";
import likeIcon from "../../../assets/icons/like.svg";
import commentIcon from "../../../assets/icons/comment.svg";

export function UserPost({ avatar, username, image, text, placeholder }) {
  if (placeholder) return <StyledUserPost className="placeholder" />

  return(
    <StyledUserPost>
      <div>
        <img className="avatar" src={avatar} />
        <div>{username}</div>
      </div>
      <img className="post-image" src={image} />
      <div>{text}</div>
      <div>
        <button className="like">
          <img src={likeIcon} />
        </button>
        <button className="comment">
          <img src={commentIcon} />
        </button>
      </div>
    </StyledUserPost>
  )
}