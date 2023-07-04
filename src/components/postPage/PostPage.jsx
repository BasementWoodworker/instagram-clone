import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { StyledPostPage } from "./PostPage.styles";
import { StyledPostPageModal } from "./PostPageModal.styles";
import { UserPost } from "../userPost/UserPost";

export function PostPage({ setPostsInUserPage, setPostsInFeed }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isModal = location.state?.previousLocation;
  console.log("Location state: ", location.state);
  console.log("Is modal? :", isModal);
  const removePostFromArray = location.state?.removePostFromArray;
  const postId = location.pathname.replace("/post/", "");
  const [postInfo, setPostInfo] = useState(null);

  async function loadPostInfo(postId) {
    const firestore = getFirestore();
    const storage = getStorage();
    const postDoc = await getDoc(doc(firestore, "posts", postId));
    const { uid, likes, text, timestamp } = postDoc.data();
    const userDoc = await getDoc(doc(firestore, "users", uid));
    const { username } = userDoc.data();
    const avatar = await getDownloadURL(ref(storage, `userImages/${uid}/avatar`));
    const image = await getDownloadURL(ref(storage, `userImages/${uid}/${postId}`));

    return {
      username,
      image,
      text,
      avatar,
      likes,
      timestamp
    }
  }

  function forbidScrolling() {
    document.body.style.overflow = "hidden";
  }

  function allowScrolling() {
    document.body.style.overflow = "visible";
  }

  useEffect(() => {
    forbidScrolling();
    setPostInfo(null);
    loadPostInfo(postId).then(response => setPostInfo(response));

    return allowScrolling;
  }, [location])

  function goBack() {
    navigate(-1);
    console.log("GO BACK")
  }

  const StyledWrapper = isModal ? StyledPostPageModal : StyledPostPage;

  return(
    <StyledWrapper onMouseDown={isModal ? goBack : () => {}}>
      {!postInfo ?
        <UserPost placeholder="true" view="full" /> :
        <UserPost
          view="full"
          key={postId}
          postId={postId}
          avatar={postInfo.avatar}
          username={postInfo.username}
          image={postInfo.image}
          text={postInfo.text}
          initialLikes={postInfo.likes}
          timestamp={postInfo.timestamp}
          removePostFromFeed={() => {}}
          showCloseButton={isModal}
          setPostsInUserPage={setPostsInUserPage}
          setPostsInFeed={setPostsInFeed}
        />
      }
    </StyledWrapper>
  )
}