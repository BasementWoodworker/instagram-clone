import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

import { selectUser } from "../../../redux/features/user/userSlice";
import { AreYouSure } from "../../areYouSure/areYouSure";

export function Comment({ text, username, commentId, deleteComment }) {
  const [showDeletionModal, setShowDeletionModal] = useState(false);
  const user = useSelector(selectUser);
  if (text === "") return null;
  const showDeleteButton = (commentId && user && user.username) === username;

  return(
    <div className="comment-container">
      <Link className="author" to={`/user/${username}`}>{username}</Link>
      <div className="text">{text}</div>
      {showDeleteButton && <button className="delete-comment" onClick={() => setShowDeletionModal(true)}>✖</button>}
      {showDeletionModal && <AreYouSure text="Your comment will be deleted" action={() => deleteComment(commentId)} hide={() => setShowDeletionModal(false)} />}
    </div>
  )
}