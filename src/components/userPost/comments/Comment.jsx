import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

import { selectUser } from "../../../redux/features/user/userSlice";
import { AreYouSure } from "../../areYouSure/areYouSure";

export function Comment({ text, username, commentId, postId }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [showDeletionModal, setShowDeletionModal] = useState(false);
  const user = useSelector(selectUser);
  if (isDeleted || text === "") return null;

  const showDeleteButton = (commentId && user && user.username) === username;

  async function deleteComment() {
    const commentRef = doc(getFirestore(), "posts", postId, "comments", commentId);
    await deleteDoc(commentRef);
    setIsDeleted(true);
  }

  return(
    <div className="comment-container">
      <Link className="author" to={`/user/${username}`}>{username}</Link>
      <div className="text">{text}</div>
      {showDeleteButton && <button className="delete-comment" onClick={() => setShowDeletionModal(true)}>✖</button>}
      {showDeletionModal && <AreYouSure text="Your comment will be deleted" action={deleteComment} hide={() => setShowDeletionModal(false)} />}
    </div>
  )
}