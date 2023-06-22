import React, { useEffect, useRef } from "react";

import { UserPost } from "../userPost/UserPost";
import { StyledUserPostModal } from "./UserPostModal.styles";

export function UserPostModal({ postInfo, closeModal, avatar, username }) {
  const body = document.body;
  const modal = useRef();

  useEffect(() => {
    modal.current.scrollTo(0, 0);
    window.history.pushState("post", "", "/post/" + postInfo.postId);
    forbidScrolling();
    addEventListener("popstate", closeModal);
    return () => {
      removeEventListener("popstate", closeModal);
      allowScrolling();
    }
  }, [])

  function forbidScrolling() {
    body.style.position = "fixed";
  }

  function allowScrolling() {
    body.style.position = "";
  }

  function goBack() {
    window.history.back();
    closeModal();
  }

  return(
    <StyledUserPostModal onClick={goBack} ref={modal}>
      <UserPost
        view="full"
        key={postInfo.postId}
        postId={postInfo.postId}
        avatar={avatar ?? postInfo.avatar}
        username={username ?? postInfo.username}
        image={postInfo.image}
        text={postInfo.text}
        initialLikes={postInfo.initialLikes}
        removePostFromFeed={postInfo.removePostFromFeed}
        setOriginalDisplayedComments={postInfo.setOriginalDisplayedComments}
        showCloseButton={true}
      />
    </StyledUserPostModal>
  )
}