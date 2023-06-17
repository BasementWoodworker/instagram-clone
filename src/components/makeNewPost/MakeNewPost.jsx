import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, addDoc, collection, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadString } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/user/userSlice";

import { StyledMakeNewPost } from "./MakeNewPost.styles";
import { UploadImage } from "./steps/1/UploadImage";
import { Cropper } from "./steps/2/Cropper";
import { AddCaption } from "./steps/3/AddCaption";
import { LoadingSpinner } from "../loadingSpinner/LoadingSpinner";

export function MakeNewPost() {
  const [currentStep, setCurrentStep] = useState("upload-image");
  const [selectedImage, setSelectedImage] = useState();
  const [croppedImage, setCroppedImage] = useState();
  const [cropFunction, setCropFunction] = useState();
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  async function uploadPostImage(postId) {
    const imageName = postId;
    const storageRef = ref(getStorage(), `userImages/${getAuth().currentUser.uid}/${imageName}`);
    await uploadString(storageRef, croppedImage, "data_url")
  }

  async function savePostIdInUsersFirestore(newPostId) {
    const userRef = doc(getFirestore(), "users", getAuth().currentUser.uid);
    await updateDoc(userRef, {
      posts: arrayUnion(newPostId)
    })
  }

  async function submitPost() {
    if (loading) return;
    setLoading(true);
    try {
      if (!croppedImage) throw new Error("Error: no image to upload");
      const firestore = getFirestore();
      const newPost = {
        uid: user.uid,
        text: caption,
        likes: [],
        timestamp: serverTimestamp()
      }
      const postData = await addDoc(collection(firestore, "posts"), newPost);
      const postId = postData._key.path.segments[1];
      await savePostIdInUsersFirestore(postId);
      await uploadPostImage(postId);
      console.log("Successfully created new post");
      navigate("/feed");
    }
    catch(error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  function goToNextStep() {
    if (currentStep === "crop-image") {
      cropFunction()
      setCurrentStep("add-caption")
    }
    else if (currentStep === "add-caption") submitPost()
  }

  function goToPreviousStep() {
    if (currentStep === "crop-image") setCurrentStep("upload-image")
    else if (currentStep === "add-caption") setCurrentStep("crop-image")
  }

  return(
    <StyledMakeNewPost>
      {
        currentStep === "upload-image" ?  <UploadImage setCurrentStep={setCurrentStep} setSelectedImage={setSelectedImage} /> :
        currentStep === "crop-image" ? <Cropper selectedImage={selectedImage} setCroppedImage={setCroppedImage} setCropFunction={setCropFunction} /> :
        currentStep === "add-caption" ? <AddCaption croppedImage={croppedImage} caption={caption} setCaption={setCaption} submitPost={submitPost} /> :
        null
      }
      {
      currentStep !== "upload-image" &&
      <nav>
        <button onClick={goToPreviousStep}>{currentStep === "crop-image" ? "Cancel" : "Back"}</button>
        {loading && <LoadingSpinner size="50px" />}
        <button onClick={goToNextStep}>{currentStep === "crop-image" ? "Continue" : "Post"}</button>
      </nav>
      }
    </StyledMakeNewPost>
  )
}