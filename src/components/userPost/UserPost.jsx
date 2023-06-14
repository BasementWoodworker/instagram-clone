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

import { StyledUserPost, StyledUserPostFullView } from "./UserPost.styles";
import { selectUser } from "../../redux/features/user/userSlice";
import { Comments } from "./comments/Comments";
import { MakeNewComment } from "./comments/MakeNewComment";
import { AreYouSure } from "../areYouSure/areYouSure";
import { deletePostFromDatabase } from "../../reusableFunctions/deletePostFromDatabase";

export function UserPost({ view, postId, avatar, username, image, text, initialLikes, placeholder, removePostFromArray }) {
  if (placeholder) return <StyledUserPost className="placeholder" />

  const user = useSelector(selectUser);
  const [liked, setLiked] = useState(initialLikes.includes(user.uid));
  const [allLikes, setAllLikes] = useState(initialLikes);
  const [likeButtonDisabled, setLikeButtonDisabled] = useState(false);
  const [showDeletionModal, setShowDeletionModal] = useState(false);
  const [displayedComments, setDisplayedComments] = useState([]);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const commentInputRef = useRef();
  const postRef = useRef();

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
    if (view === "in-feed") setDisplayedComments(prev => [newComment].concat(prev))
    else if (view === "full") setDisplayedComments(prev => prev.concat([newComment]))
  }

  useEffect(() => {
    const comments = postRef.current.querySelector(".comments");
    if (view === "full") comments.scrollTop = comments.scrollHeight
    else if (view === "in-feed") comments.scrollTop = 0;
  }, [displayedComments])

  useEffect(() => {
    if (commentInputRef.current) {
      commentInputRef.current.focus()
    }
  }, [showCommentInput])
 
  if (view === "in-feed") return(
    <StyledUserPost className={liked ? "liked" : ""} ref={postRef}>
      <Link className="author-info" to={`/user/${username}`}>
        <img className="avatar" src={avatar} />
        <div className="username" >{username}</div>
      </Link>
      <Link className="post-image-container" to={`/post/${postId}`}>
        <img className="post-image" src={image} />
      </Link>
      <div className="like-and-comment-buttons">
        <button className="like" onClick={handleLike} disabled={likeButtonDisabled}></button>
        <button className="comment" onClick={() => setShowCommentInput(prev => !prev)}></button>
      </div>
      <div id="like-amount">{allLikes.length + " " + (allLikes.length === 1 ? "like" : "likes")}</div>
      <Comments view={view} postId={postId} author={username} authorComment={text} displayedComments={displayedComments} setDisplayedComments={setDisplayedComments} />
      {showCommentInput && <MakeNewComment makeNewComment={makeNewComment} commentInputRef={commentInputRef} setDisplayedComments={setDisplayedComments} />}
      {username === user.username && <button className="delete-post" onClick={() => setShowDeletionModal(true)}>✖</button>}
      {showDeletionModal && <AreYouSure text="Your post will be deleted" action={deletePost} hide={() => setShowDeletionModal(false)} />}
    </StyledUserPost>
  )
  else if (view === "full") return(
    <StyledUserPostFullView className={liked ? "liked" : ""} ref={postRef}>
      <img className="post-image" src={image} />
      <div id="right-part">
        <Link className="author-info" to={`/user/${username}`}>
          <img className="avatar" src={avatar} />
          <div className="username" >{username}</div>
        </Link>
        <div className="separator-line"></div>
        <div className="like-and-comment-buttons">
          <button className="like" onClick={handleLike} disabled={likeButtonDisabled}></button>
          <button className="comment" onClick={() => setShowCommentInput(prev => !prev)}></button>
        </div>
        <div id="like-amount">{allLikes.length + " " + (allLikes.length === 1 ? "like" : "likes")}</div>
        <Comments view={view} postId={postId} author={username} authorComment={text} displayedComments={displayedComments} setDisplayedComments={setDisplayedComments} />
        <MakeNewComment makeNewComment={makeNewComment} commentInputRef={commentInputRef} />
        {username === user.username && <button className="delete-post" onClick={() => setShowDeletionModal(true)}>✖</button>}
        {showDeletionModal && <AreYouSure text="Your post will be deleted" action={deletePost} hide={() => setShowDeletionModal(false)} />}
      </div>
    </StyledUserPostFullView>
  )
}