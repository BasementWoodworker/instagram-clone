import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, getDocs, collection } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { StyledFeed } from "./Feed.styles";
import { UserPost } from "./userPost/UserPost";

export function Feed() {
  const [posts, setPosts] = useState([{ placeholder: true, id: 1 }]);

  async function loadPosts() {
    const response = await getDocs(collection(getFirestore(), "posts"));
    const processedResponse = await Promise.all(response.docs.map( async post => {
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
    setPosts(processedResponse);
  }

  function removePostFromArray(postId) {
    setPosts(posts.filter(post => post.id !== postId));
  }

  useEffect(() => { 
    loadPosts()
  }, []);

  return(
    <StyledFeed>
      {posts.map(post => {
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
    </StyledFeed>
  )
}
