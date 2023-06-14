import React, { useEffect, useState, useRef } from "react";
import { getFirestore, doc, getDoc, getDocs, collection, query, limit, orderBy, startAfter } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { StyledFeed } from "./Feed.styles";
import { UserPost } from "../userPost/UserPost";
import { LoadingSpinner } from "../loadingSpinner/LoadingSpinner";

export function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stopPoint, setStopPoint] = useState(null);
  const [distanceFromBottom, setDistanceFromBottom] = useState(0);
  const [message, setMessage] = useState("");
  const feedRef = useRef();

  async function loadMorePosts() {
    setLoading(true);
    try {
      const q = query(collection(getFirestore(), "posts"), orderBy("timestamp"), limit(7), startAfter(stopPoint));
      const response = await getDocs(q);
      const lastDisplayedDoc = response.docs[response.docs.length - 1];
      if (!lastDisplayedDoc) setMessage("No more posts");
      setStopPoint(lastDisplayedDoc);
      await processLoadedPosts(response.docs);
    }
    catch(error) {
      console.log("error happened")
      setMessage("Error loading posts", error);
    }
    finally {
      setLoading(false);
    }
  }

  async function processLoadedPosts(arrayOfPostDocs) {
    const processedResponse = await Promise.all(arrayOfPostDocs.map( async post => {
      const { text, uid, likes } = post.data();
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
        likes
      }
    }));
    setPosts(prev => prev.concat(processedResponse));
  }

  function removePostFromArray(postId) {
    setPosts(posts.filter(post => post.id !== postId));
  }

  useEffect(() => { 
    window.addEventListener("scroll", updateDistance);
    return () => window.removeEventListener("scroll", updateDistance);
  }, []);

  useEffect(() => {
    if (distanceFromBottom < 2000 && !loading && stopPoint !== undefined) {
      loadMorePosts()
    }
  }, [distanceFromBottom])

  function updateDistance() {
    setDistanceFromBottom(feedRef.current.getBoundingClientRect().bottom);
  }

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
            removePostFromArray={removePostFromArray}
          />
      })}
      {loading && <LoadingSpinner size="150px" type="2" />}
      <div className="message">{message}</div>
    </StyledFeed>
  )
}
