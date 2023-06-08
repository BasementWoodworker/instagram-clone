import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, getDoc, doc, query, orderBy, limit } from "firebase/firestore";

import { Comment } from "./Comment";
import { LoadingSpinner } from "../../../loadingSpinner/LoadingSpinner";

export function Comments({ postId, author, authorComment, displayedComments, setDisplayedComments }) {
  const [hideShowAllComments, setHideShowAllComments] = useState(true);
  const [loadingAllComments, setLoadingAllComments] = useState(false);

  async function loadFirstThreeComments() {
    const commentsRef = collection(getFirestore(), "posts", postId, "comments");
    const q = query(commentsRef, orderBy("timestamp"), limit(4));
    const response = await getDocs(q);
    if (response.docs.length === 4) {
      setHideShowAllComments(false);
      processLoadedComments(response.docs.slice(0, -1));
      return;
    }
    processLoadedComments(response.docs);
  }

  useEffect(() => {
    loadFirstThreeComments();
  }, [])

  async function viewAllComments() {
    try {
      setLoadingAllComments(true);
      setHideShowAllComments(true);
      const commentsRef = collection(getFirestore(), "posts", postId, "comments");
      const q = query(commentsRef, orderBy("timestamp"));
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
    for (const comment of commentDocs) {
      const author = await getDoc(doc(getFirestore(), "users", comment.data().uid))
      const authorUsername = author.data() ? author.data().username : "Deleted account";
      loadedComments.push({
        text: comment.data().text,
        username: authorUsername,
        id: comment.id
      })
    }
    setDisplayedComments(loadedComments);
  }

  return(
    <div className="comments">
      <div>
        <Comment text={authorComment} username={author} key="authorsComment" />
        {hideShowAllComments || <button className="view-all-comments" onClick={viewAllComments}>View all comments</button>}
        {loadingAllComments && <LoadingSpinner />}
        {displayedComments.map(comment => <Comment key={comment.id} text={comment.text} username={comment.username} commentId={comment.id} postId={postId} />)}
      </div>
    </div>
  )
}