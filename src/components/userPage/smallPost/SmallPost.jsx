import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, collection, getCountFromServer } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { StyledSmallPost } from "./SmallPost.styles";

export function SmallPost({ postId, userId }) {
  const [postInfo, setPostInfo] = useState(null);

  async function loadPostInfo() {
    const post = (await getDoc(doc(getFirestore(), "posts", postId))).data();
    const postImage = await getDownloadURL(ref(getStorage(), `userImages/${userId}/${postId}`));
    const commentsSnapshot = await getCountFromServer(collection(getFirestore(), "posts", postId, "comments"));
    return {
      image: postImage,
      likeAmount: post.likes.length,
      commentAmount: commentsSnapshot.data().count
    };
  }

  useEffect(() => {
    loadPostInfo().then(response => {
      setPostInfo(response);
    })
  })

  if (!postInfo) return null;

  return(
    <StyledSmallPost to={`/post/${postId}`}>
      <img src={postInfo.image} />
      <div className="like-and-comment-count">
        <div>
          <div className="like-icon"></div>
          <div>{postInfo.likeAmount}</div>
        </div>
        <div>
          <div className="comment-icon"></div>
          <div>{postInfo.commentAmount}</div>
        </div>
      </div>
    </StyledSmallPost>
  )
}