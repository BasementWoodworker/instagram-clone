import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, getDoc, doc, query, orderBy, limit } from "firebase/firestore";

import { Comment } from "./Comment";
import { LoadingSpinner } from "../../loadingSpinner/LoadingSpinner";

export function Comments({ view, postId, author, authorComment, displayedComments, setDisplayedComments, deleteComment }) {
  const [hideShowAllComments, setHideShowAllComments] = useState(true);
  const [loadingAllComments, setLoadingAllComments] = useState(false);

  async function loadThreeLatestComments() {
    const commentsRef = collection(getFirestore(), "posts", postId, "comments");
    const q = query(commentsRef, orderBy("timestamp", "desc"), limit(4));
    const response = await getDocs(q);
    if (response.docs.length === 4) {
      setHideShowAllComments(false);
      processLoadedComments(response.docs.slice(0, -1));
      return;
    }
    processLoadedComments(response.docs);
  }

  useEffect(() => {
    if (view === "in-feed") loadThreeLatestComments()
    else if (view === "full") viewAllComments();
  }, [])

  async function viewAllComments() {
    try {
      setLoadingAllComments(true);
      setHideShowAllComments(true);
      const commentsRef = collection(getFirestore(), "posts", postId, "comments");
      let q;
      if (view === "in-feed") q = query(commentsRef, orderBy("timestamp", "desc"))
      else if (view === "full") q = query(commentsRef, orderBy("timestamp"))
      const response = await getDocs(q);
      await processLoadedComments(response.docs);
    }
    catch(error) {
      console.log(error);
    }
    finally {
      setLoadingAllComments(false);
    }
  }

  async function processLoadedComments(commentDocs) {
    const loadedComments = [];
    for (const commentDoc of commentDocs) {
      if (displayedComments.find(comment => comment.id === commentDoc.id)) continue;
      const author = await getDoc(doc(getFirestore(), "users", commentDoc.data().uid))
      const authorUsername = author.data() ? author.data().username : "Deleted account";
      loadedComments.push({
        text: commentDoc.data().text,
        username: authorUsername,
        id: commentDoc.id
      })
    }
    if (view === "in-feed") setDisplayedComments(prev => prev.concat(loadedComments))
    else if (view === "full") setDisplayedComments(prev => loadedComments.concat(prev));
  }

  return(
    <div className="comments">
      <Comment text={authorComment} username={author} key="authorsComment" />
      {hideShowAllComments || <button className="view-all-comments" onClick={viewAllComments}>View all comments</button>}
      {loadingAllComments && <LoadingSpinner />}
      {displayedComments.map(comment => <Comment key={comment.id} text={comment.text} username={comment.username} commentId={comment.id} deleteComment={deleteComment} />)}
    </div>
  )
}