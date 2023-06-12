import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { StyledPostPage } from "./PostPage.styles";
import { UserPost } from "../feed/userPost/UserPost";
import { LoadingSpinner } from "../loadingSpinner/LoadingSpinner";

export function PostPage() {
  const location = useLocation();
  const postId = location.pathname.replace("/post/", "");
  const [postInfo, setPostInfo] = useState(null);

  async function loadPostInfo(postId) {
    const firestore = getFirestore();
    const storage = getStorage();
    const postDoc = await getDoc(doc(firestore, "posts", postId));
    const { uid, likes, text } = postDoc.data();
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
    }
  }

  useEffect(() => {
    setPostInfo(null);
    loadPostInfo(postId).then(response => setPostInfo(response));
  }, [location])

  if (!postInfo) return(
    <StyledPostPage className="loading">
      <LoadingSpinner size="200px" type={2} />
    </StyledPostPage>
  )

  return(
    <StyledPostPage>
      <UserPost
        view="full"
        key={postId}
        postId={postId}
        username={postInfo.username}
        image={postInfo.image}
        text={postInfo.text}
        avatar={postInfo.avatar}
        initialLikes={postInfo.likes}
        removePostFromArray={() => {}}
      />
    </StyledPostPage>
  )
}