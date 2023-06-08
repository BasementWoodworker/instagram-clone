import React, { useState } from "react";

export function MakeNewComment({ makeNewComment, commentInputRef, setDisplayedComments }) {
  const [disablePostButton, setDisablePostButton] = useState(true);

  function togglePostButton() {
    if (commentInputRef.current.value === "") setDisablePostButton(true)
    else setDisablePostButton(false)
  }
  
  async function submitHandler(e) {
    e.preventDefault();
    setDisablePostButton(true);
    try {
      const newComment = await makeNewComment();
      setDisplayedComments(prev => [newComment].concat(prev));
      commentInputRef.current.value = "";
    }
    catch(error) {
      console.log(error);
    }
    finally {
      setDisablePostButton(false);
    }
  }

  return(
    <form className="make-new-comment" onSubmit={submitHandler}>
        <input type="text" placeholder="Add a comment" ref={commentInputRef} onInput={togglePostButton} />
        <button type="submit" disabled={disablePostButton}>Post</button>
    </form>
  )
}