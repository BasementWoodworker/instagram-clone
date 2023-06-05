import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, getDocs, collection } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { StyledFeed } from "./Feed.styles";
import { UserPost } from "./userPost/UserPost";

export function Feed() {
  const [posts, setPosts] = useState([<UserPost placeholder={true}/>]);

  async function loadPosts() {
    const response = await getDocs(collection(getFirestore(), "posts"));
    const processedResponse = await Promise.all(response.docs.map( async post => {
      const { text, uid } = post.data();
      const avatarPath = `${uid}/avatar`;
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
        id: post.id
      }
    }));
    setPosts(processedResponse);
  }

  useEffect(() => { 
    loadPosts()
  }, []);

  return(
    <StyledFeed>
      {posts.map(post => <UserPost username={post.username} image={post.image} text={post.text} avatar={post.avatar} key={post.id} />)}
    </StyledFeed>
  )
}
