import React, { useEffect, useState, useRef } from "react";
import { getFirestore, doc, getDoc, getDocs, collection, query, limit, orderBy, startAfter } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { StyledFeed } from "./Feed.styles";
import { UserPost } from "../userPost/UserPost";
import { LoadingSpinner } from "../loadingSpinner/LoadingSpinner";

function useStateThatIsUpToDateInEventHandlers(initialState) {
  const [state, setState] = useState(initialState);
  const stateRef = useRef(state);
  function setStateModified(newState) {
    stateRef.current = newState;
    setState(newState)
  }
  return [state, setStateModified, stateRef];
}

export function Feed({ posts, setPosts }) {
  const [loading, setLoading, loadingRefedValue] = useStateThatIsUpToDateInEventHandlers(true);
  const stopPoint = useRef(null);
  const [message, setMessage] = useState("");
  const feedRef = useRef();

  async function firstLoad() {
    try {
      const firstQ = query(collection(getFirestore(), "posts"), orderBy("timestamp", "desc"), limit(7));
      const response = await getDocs(firstQ);
      const lastDisplayedDoc = response.docs[response.docs.length - 1];
      if (!lastDisplayedDoc) setMessage("End of posts");
      stopPoint.current = lastDisplayedDoc;
      await processLoadedPosts(response.docs);
    }
    catch(error) {
      setMessage("Error loading posts" + error);
    }
    finally {
      setLoading(false);
    }
  }

  async function loadMorePosts() {
    setLoading(true);
    try {
      const q = query(collection(getFirestore(), "posts"), orderBy("timestamp", "desc"), limit(7), startAfter(stopPoint.current));
      const response = await getDocs(q);
      const lastDisplayedDoc = response.docs[response.docs.length - 1];
      if (!lastDisplayedDoc) setMessage("End of posts");
      stopPoint.current = lastDisplayedDoc;
      await processLoadedPosts(response.docs);
    }
    catch(error) {
      setMessage("Error loading posts" + error);
    }
    finally {
      setLoading(false);
    }
  }

  async function processLoadedPosts(arrayOfPostDocs) {
    const processedResponse = await Promise.all(arrayOfPostDocs.map( async post => {
      const { text, uid, likes, timestamp } = post.data();
      const avatarPath = `userImages/${uid}/avatar`;
      const imagePath = `userImages/${uid}/${post.id}`;
      const username = (await getDoc(doc(getFirestore(), "users", uid))).data().username;
      const postImage = await getDownloadURL(ref(getStorage(), imagePath));
      let posterAvatar;
      try { posterAvatar = await getDownloadURL(ref(getStorage(), avatarPath)) }
      catch { posterAvatar = await getDownloadURL(ref(getStorage(), "default-avatar.svg")) }

      return {
        username,
        avatar: posterAvatar,
        image: postImage,
        text,
        id: post.id,
        likes,
        timestamp
      }
    }));
    setPosts(prev => prev.concat(processedResponse));
  }

  function removePostFromFeed(postId) {
    setPosts(posts.filter(post => post.id !== postId));
  }

  function checkDistance() {
    const distanceFromBottom = feedRef.current.getBoundingClientRect().bottom;
    if (distanceFromBottom < 2000 && !loadingRefedValue.current && stopPoint.current !== undefined) {
      loadMorePosts()
    }
  }

  useEffect(() => { 
    setPosts([]);
    firstLoad();
    window.addEventListener("scroll", checkDistance);
    return () => window.removeEventListener("scroll", checkDistance);
  }, []);

  return(
    <StyledFeed ref={feedRef}>
      {posts.length === 0 ?
        <UserPost placeholder={true} id="1" /> :
        posts.map(post => {
          return <UserPost
            view="in-feed"
            placeholder={post.placeholder}
            key={post.id}
            postId={post.id}
            username={post.username}
            image={post.image}
            text={post.text}
            avatar={post.avatar}
            initialLikes={post.likes}
            timestamp={post.timestamp}
            removePostFromFeed={removePostFromFeed}
            setPostsInFeed={setPosts}
            newCommentForFeedOnly={post.newComment}
            freshlyDeletedComment={post.deletedComment}
          />
      })}
      {loading && <LoadingSpinner size="150px" type="2" />}
      <div className="message">{message}</div>
    </StyledFeed>
  )
}
