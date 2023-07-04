import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getFirestore, doc, getDoc, collection, getCountFromServer, onSnapshot } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { StyledSmallPost } from "./SmallPost.styles";

export function SmallPost({ postId, userId}) {
  const [postInfo, setPostInfo] = useState(null);
  const location = useLocation();

  async function loadPostInfo() {
    const post = (await getDoc(doc(getFirestore(), "posts", postId))).data();
    const postImage = await getDownloadURL(ref(getStorage(), `userImages/${userId}/${postId}`));
    const commentsSnapshot = await getCountFromServer(collection(getFirestore(), "posts", postId, "comments"));
    return {
      image: postImage,
      likeAmount: post.likes.length,
      commentAmount: commentsSnapshot.data().count,
    };
  }

  useEffect(() => {
    loadPostInfo().then(response => {
      setPostInfo(response);
    })
    const unsubscribeFromLikes = onSnapshot(
      doc(getFirestore(), "posts", postId),
      { includeMetadataChanges: true },
      (doc) => {
        if (doc.metadata.hasPendingWrites || !doc.data()) return;
        const newLikeAmmount = doc.data().likes.length;
        setPostInfo(prev => ({ ...prev, likeAmount: newLikeAmmount }))
      }
    )
    const unsubscribeFromComments = onSnapshot(
      collection(getFirestore(), "posts", postId, "comments"),
      { includeMetadataChanges: true },
      (collectionSnapshot) => {
        if (collectionSnapshot.metadata.hasPendingWrites) return;
        const newCommentAmount = collectionSnapshot.docs.length;
        setPostInfo(prev => ({ ...prev, commentAmount: newCommentAmount }))
      }
    )
    return () => {
      unsubscribeFromLikes();
      unsubscribeFromComments();
    }
  }, [])

  if (!postInfo) return null;

  return(
    <StyledSmallPost to={"/post/" + postId} state={{ previousLocation: location }} className={postInfo?.image ? "" : "skeleton"}>
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