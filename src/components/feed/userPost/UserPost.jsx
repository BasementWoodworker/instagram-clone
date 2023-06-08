import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
  getFirestore,
  doc,
  addDoc,
  updateDoc,
  collection,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  onSnapshot
} from "firebase/firestore";

import { StyledUserPost } from "./UserPost.styles";
import { selectUser } from "../../../redux/features/user/userSlice";
import { Comments } from "./comments/Comments";
import { MakeNewComment } from "./comments/MakeNewComment";
import { AreYouSure } from "../../areYouSure/areYouSure";
import { deletePostFromDatabase } from "../../../reusableFunctions/deletePostFromDatabase";

export function UserPost({ postId, avatar, username, image, text, initialLikes, placeholder, removePostFromArray }) {
  if (placeholder) return <StyledUserPost className="placeholder" />

  const user = useSelector(selectUser);
  const [liked, setLiked] = useState(initialLikes.includes(user.uid));
  const [allLikes, setAllLikes] = useState(initialLikes);
  const [likeButtonDisabled, setLikeButtonDisabled] = useState(false);
  const [showDeletionModal, setShowDeletionModal] = useState(false);
  const [displayedComments, setDisplayedComments] = useState([]);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const commentInputRef = useRef();

  async function handleLike() {
    setLikeButtonDisabled(true);
    if (liked) {
      await removeLike()
      setLiked(false);
    } else {
      await addLike();
      setLiked(true);
    }
    setLikeButtonDisabled(false);
  }

  async function addLike() {
    await updateDoc(doc(getFirestore(), "posts", postId), {
      likes: arrayUnion(user.uid)
    })
  }

  async function removeLike() {
    await updateDoc(doc(getFirestore(), "posts", postId), {
      likes: arrayRemove(user.uid)
    })
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(getFirestore(), "posts", postId),
      { includeMetadataChanges: true },
      (doc) => {
        if (doc.metadata.hasPendingWrites || !doc.data()) return;
        setAllLikes(doc.data().likes);
      }
    )
    return unsubscribe;
  }, [])

  async function deletePost() {
    await deletePostFromDatabase(postId, user.uid);
    removePostFromArray(postId);
  }

  async function makeNewComment() {
    const response = await addDoc(collection(getFirestore(), "posts", postId, "comments"), {
      text: commentInputRef.current.value,
      uid: user.uid,
      timestamp: serverTimestamp()
    });
    const newComment = {
      text: commentInputRef.current.value,
      username: user.username,
      id: response.id,
    }
    return newComment;
  }

  //          <svg src={likeIcon} />
  //          <svg src={commentIcon} />
  useEffect(() => {
    if (commentInputRef.current) {
      commentInputRef.current.focus()
    }
  }, [showCommentInput])
 
  return(
    <StyledUserPost className={liked? "liked" : ""}>
      <Link className="author-info" to={`/user/${username}`}>
        <img className="avatar" src={avatar} />
        <div className="username" >{username}</div>
      </Link>
      <img className="post-image" src={image} />
      <div className="like-and-comment-buttons">
        <button className="like" onClick={handleLike} disabled={likeButtonDisabled}></button>
        <button className="comment" onClick={() => setShowCommentInput(prev => !prev)}></button>
      </div>
      <div>{allLikes.length + " " + (allLikes.length === 1 ? "like" : "likes")}</div>
      <Comments postId={postId} author={username} authorComment={text} displayedComments={displayedComments} setDisplayedComments={setDisplayedComments} />
      {showCommentInput && <MakeNewComment makeNewComment={makeNewComment} commentInputRef={commentInputRef} setDisplayedComments={setDisplayedComments} />}
      {username === user.username && <button className="delete-post" onClick={() => setShowDeletionModal(true)}>✖</button>}
      {showDeletionModal && <AreYouSure text="Your post will be deleted" action={deletePost} hide={() => setShowDeletionModal(false)} />}
    </StyledUserPost>
  )
}