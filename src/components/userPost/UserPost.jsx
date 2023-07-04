import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
  getFirestore,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  onSnapshot
} from "firebase/firestore";

import { StyledUserPost, StyledUserPostFullView } from "./UserPost.styles";
import { TopBar } from "./topBar/TopBar";
import { Comments } from "./comments/Comments";
import { MakeNewComment } from "./comments/MakeNewComment";
import { AreYouSure } from "../areYouSure/areYouSure";
import { LoadingSpinner } from "../loadingSpinner/LoadingSpinner";
import { deletePostFromDatabase } from "../../reusableFunctions/deletePostFromDatabase";
import { selectUser } from "../../redux/features/user/userSlice";

export function UserPost({ 
  view,
  postId,
  avatar,
  username,
  image,
  text,
  initialLikes,
  timestamp,
  placeholder,
  showCloseButton,
  setPostsInUserPage,
  setPostsInFeed,
  newCommentForFeedOnly,
  freshlyDeletedComment
}) {
  if (placeholder) {
    if (view === "full") {
      return(
        <StyledUserPost className="fullview-placeholder">
          <LoadingSpinner size="200px" type={2} />
        </StyledUserPost>)
    } else {
      return <StyledUserPost className="placeholder skeleton" />
    }
  }

  const user = useSelector(selectUser);
  const [liked, setLiked] = useState(initialLikes.includes(user.uid));
  const [allLikes, setAllLikes] = useState(initialLikes);
  const [timeFromCreation, setTimeFromCreation] = useState();
  const [likeButtonDisabled, setLikeButtonDisabled] = useState(false);
  const [showDeletionModal, setShowDeletionModal] = useState(false);
  const [displayedComments, setDisplayedComments] = useState([]);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const commentInputRef = useRef();
  const postRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  function calculateTimeFromCreation() {
    const secondsFromPostCreation = Math.floor((Date.now() - timestamp.seconds * 1000) / 1000);
    if (secondsFromPostCreation >= 86400) {
      const daysFromPostCreation = Math.floor(secondsFromPostCreation / 86400);
      setTimeFromCreation(daysFromPostCreation + " " + (daysFromPostCreation === 1 ? "DAY" : "DAYS"))
    } else if (secondsFromPostCreation >= 3600) {
      const hoursFromPostCreation = Math.floor(secondsFromPostCreation / 3600);
      setTimeFromCreation(hoursFromPostCreation + " " + (hoursFromPostCreation === 1 ? "HOUR" : "HOURS"))
    } else if (secondsFromPostCreation >= 60) {
      const minutesFromPostCreation = Math.floor(secondsFromPostCreation / 60)
      setTimeFromCreation(minutesFromPostCreation + " " + (minutesFromPostCreation === 1 ? "MINUTE" : "MINUTES"))
    } else {
      setTimeFromCreation(secondsFromPostCreation + " " + (secondsFromPostCreation === 1 ? "SECOND" : "SECONDS"))
    }
  }

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
    calculateTimeFromCreation();
    const unsubscribe = onSnapshot(
      doc(getFirestore(), "posts", postId),
      { includeMetadataChanges: true },
      (doc) => {
        if (doc.metadata.hasPendingWrites || !doc.data()) return;
        const newLikes = doc.data().likes;
        setAllLikes(newLikes);
        if (newLikes.includes(user.uid)) setLiked(true)
        else setLiked(false)
      }
    )
    return unsubscribe;
  }, [])

  async function deletePost() {
    await deletePostFromDatabase(postId, user.uid);
    if (setPostsInFeed) setPostsInFeed(prev => prev.filter(post => post.id !== postId));
    if (setPostsInUserPage) setPostsInUserPage(prev => prev.filter(id => id !== postId));
    if (view === "full") navigate(-1);
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
    if (view === "in-feed") {
      setDisplayedComments(prev => [newComment].concat(prev))
    } else if (view === "full") {
      setDisplayedComments(prev => prev.concat([newComment]))
      setPostsInFeed(prev => prev.map(post => post.id === postId ? {...post, newComment: newComment} : post));
    }
  }

  async function deleteComment(commentId) {
    const commentRef = doc(getFirestore(), "posts", postId, "comments", commentId);
    await deleteDoc(commentRef);
    setPostsInFeed(prev => prev.map(post => post.id === postId ? {...post, deletedComment: commentId} : post));
    if (view !== "in-feed") setDisplayedComments(displayedComments.filter(comment => comment.id !== commentId));
  }

  useEffect(() => {
    const comments = postRef.current.querySelector(".comments");
    if (view === "full") comments.scrollTop = comments.scrollHeight
    else if (view === "in-feed") comments.scrollTop = 0;
  }, [displayedComments])

  useEffect(() => {
    if (commentInputRef.current && showCommentInput) {
      commentInputRef.current.focus()
    }
  }, [showCommentInput])

  useEffect(() => {
    if (!newCommentForFeedOnly || view === "full") return;
    setDisplayedComments(prev => [newCommentForFeedOnly].concat(prev));
    setPostsInFeed(prev => {
      const thisPost = prev.find(post => post.id === postId);
      const thisPostIndex = prev.indexOf(thisPost);
      const thisPostCopy = {...thisPost};
      delete thisPostCopy.newComment;
      return prev.map((post, index) => index === thisPostIndex ? thisPostCopy : post);
    })
  }, [newCommentForFeedOnly])

  useEffect(() => {
    console.log("FRESHLY DELETED COMMENT", freshlyDeletedComment);
    if (!freshlyDeletedComment) return;
    setDisplayedComments(displayedComments.filter(comment => comment.id !== freshlyDeletedComment));
    console.log("Displayed comments: ", displayedComments)
    setPostsInFeed(prev => {
      console.log("PREV:", prev);
      const thisPost = prev.find(post => post.id === postId);
      const thisPostIndex = prev.indexOf(thisPost);
      const thisPostCopy = {...thisPost};
      delete thisPostCopy.deletedComment;
      return prev.map((post, index) => index === thisPostIndex ? thisPostCopy : post);
    })
  }, [freshlyDeletedComment])
 
  if (view === "in-feed") return(
    <StyledUserPost className={liked ? "liked" : ""} ref={postRef}>
      <TopBar username={username} avatar={avatar} setShowDeletionModal={setShowDeletionModal} showDeleteButton={username === user.username} />
      <Link className="post-image-container" to={"/post/" + postId} state={{ previousLocation: location }}>
        <img className="post-image" src={image} />
      </Link>
      <div className="like-and-comment-buttons">
        <button className="like" onClick={handleLike} disabled={likeButtonDisabled}></button>
        <button className="comment" onClick={() => setShowCommentInput(prev => !prev)}></button>
      </div>
      <div id="like-amount">{allLikes.length + " " + (allLikes.length === 1 ? "like" : "likes")}</div>
      <Comments view={view} postId={postId} author={username} authorComment={text} displayedComments={displayedComments} setDisplayedComments={setDisplayedComments} deleteComment={deleteComment} />
      <div className="time-from-creation">{timeFromCreation} AGO</div>
      {showCommentInput && <MakeNewComment makeNewComment={makeNewComment} commentInputRef={commentInputRef} setDisplayedComments={setDisplayedComments} />}
      {showDeletionModal && <AreYouSure text="Your post will be deleted" action={deletePost} hide={() => setShowDeletionModal(false)} />}
    </StyledUserPost>
  )
  else if (view === "full") return(
    <StyledUserPostFullView className={liked ? "liked" : ""} ref={postRef} onClick={(e) => e.stopPropagation()} onMouseDown={e => e.stopPropagation()}>
      <TopBar mobile="true" username={username} avatar={avatar} setShowDeletionModal={setShowDeletionModal} showDeleteButton={username === user.username} showCloseButton={showCloseButton} />
      <img className="post-image" src={image} href={image} onClick={() => window.open(image)} />
      <div id="right-part">
      <TopBar username={username} avatar={avatar} setShowDeletionModal={setShowDeletionModal} showDeleteButton={username === user.username} showCloseButton={showCloseButton} />
        <div className="separator-line"></div>
        <div className="like-and-comment-buttons">
          <button className="like" onClick={handleLike} disabled={likeButtonDisabled}></button>
          <button className="comment" onClick={() => setShowCommentInput(prev => !prev)}></button>
        </div>
        <div id="like-amount">{allLikes.length + " " + (allLikes.length === 1 ? "like" : "likes")}</div>
        <Comments view={view} postId={postId} author={username} authorComment={text} displayedComments={displayedComments} setDisplayedComments={setDisplayedComments} deleteComment={deleteComment} />
        <div className="time-from-creation">{timeFromCreation} AGO</div>
        <MakeNewComment makeNewComment={makeNewComment} commentInputRef={commentInputRef} />
        {showDeletionModal && <AreYouSure className="deletion-modal" text="Your post will be deleted" action={deletePost} hide={() => setShowDeletionModal(false)} />}
      </div>
    </StyledUserPostFullView>
  )
}