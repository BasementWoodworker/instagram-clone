import React, { useRef } from "react";
import { getFirestore, doc, addDoc, collection, updateDoc, arrayUnion } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/user/userSlice";

import { StyledMakeNewPost } from "./MakeNewPost.styles";

export function MakeNewPost() {
  const imageInputRef = useRef();
  const textInputRef = useRef();
  const user = useSelector(selectUser);

  async function uploadPostImage(postId) {
    const imageName = postId;
    const image = imageInputRef.current.files[0];
    const storageRef = ref(getStorage(), `userImages/${getAuth().currentUser.uid}/${imageName}`);
    await uploadBytes(storageRef, image);
  }

  async function savePostIdInUsersFirestore(newPostId) {
    const userRef = doc(getFirestore(), "users", getAuth().currentUser.uid);
    await updateDoc(userRef, {
      posts: arrayUnion(newPostId)
    })
  }

  async function submitPost(e) {
    e.preventDefault();
    try {
      if (imageInputRef.current.files.length === 0) throw new Error("Error: no image to upload");
      const db = getFirestore();
      const newPost = {
        uid: user.uid,
        text: textInputRef.current.value,
      }
      const postData = await addDoc(collection(db, "posts"), newPost);

      const postId = postData._key.path.segments[1];
      await savePostIdInUsersFirestore(postId);
      await uploadPostImage(postId);
      console.log("Successfully created new post");
    }
    catch(error) {
      console.log(error);
    }
  }

  return(
    <StyledMakeNewPost onSubmit={submitPost}>
      <input type="file" accept="image/*" ref={imageInputRef} />
      <input type="text" ref={textInputRef} />
      <button type="submit">Post</button>
    </StyledMakeNewPost>
  )
}