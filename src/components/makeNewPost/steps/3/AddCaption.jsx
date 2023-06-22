import React from "react";
import { useSelector } from "react-redux";

import { StyledAddCaption } from "./AddCaption.styles";
import { selectUser } from "../../../../redux/features/user/userSlice";

export function AddCaption({ croppedImage, setCaption, submitPost }) {
  const you = useSelector(selectUser);

  function submitOnEnter(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      submitPost();
    }
  }

  return(
    <StyledAddCaption>
      <div className="post-preview">
        <div className="your-info">
          <img className="avatar" src={you && you.photoURL} />
          <div className="username">{you && you.username}</div>
        </div>
        <img className="cropped-image" src={croppedImage} />
        <textarea className="caption-input" onInput={(e) => setCaption(e.target.value)} onKeyDown={submitOnEnter} placeholder="Add a caption"></textarea>
      </div>
    </StyledAddCaption>
  )
}