import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, deleteUser } from "firebase/auth";
import { getFirestore, doc, deleteDoc, getDoc, collection, getDocs } from "firebase/firestore";

import { StyledDeleteAccount } from "./DeleteAccount.styles";
import { Reauthentication } from "../reauthentication/Reauthentication";
import { LoadingSpinner } from "../../loadingSpinner/LoadingSpinner";
import { selectUser, loggedOut } from "../../../redux/features/user/userSlice";
import { deleteFirebaseStorageFolder } from "../../../reusableFunctions/deleteFirebaseStorageFolder";
import { deletePostComments, deletePostDoc } from "../../../reusableFunctions/deletePostFromDatabase";
import { unfollowEveryone } from "../../../reusableFunctions/followFunctions";

export function DeleteAccount() {
  const [showReauthentication, setShowReauthentication] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" })
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const firestore = getFirestore();

  const showSuccessMsg = () => setMessage({ type: "success", text: "✓ Account successfully deleted" });
  const showErrorMsg = (error) => setMessage({ type: "error", text: "Error deleting account: " + error });

  function submitHandler(e) {
    e.preventDefault();
    setShowReauthentication(true);
  }

  async function deleteAllData() {
    try {
      setLoading(true);
      await unfollowEveryone(user.uid);
      await deleteUserPosts();
      await deleteUserImages();
      await deleteFirestoreAccount();
      await deleteUser(getAuth().currentUser);
      showSuccessMsg();
      dispatch(loggedOut);
      setTimeout(() => navigate("/"), 3000);
    }
    catch(error) {
      showErrorMsg(error);
    }
    finally {
      setLoading(false)
    }
  }

  async function deleteFirestoreAccount() {
    await deleteDoc(doc(firestore, "users", user.uid));
    await deleteDoc(doc(firestore, "takenUsernames", user.username));
    const followersCollection = await getDocs(collection(firestore, "users", user.uid, "followers"));
    for (const followerDoc of followersCollection.docs) {
      await deleteDoc(followerDoc);
    }
  }

  async function deleteUserPosts() {
    const userPostsIds = (await getDoc(doc(firestore, "users", user.uid))).data().posts;
    for (const postId of userPostsIds) {
      await deletePostComments(postId);
      await deletePostDoc(postId);
    }
  }

  async function deleteUserImages() {
    try {
      await deleteFirebaseStorageFolder(`userImages/${user.uid}`);
    }
    catch {
      // User hasn't uploaded any images
    }
  }

  return(
    <>
      <StyledDeleteAccount onSubmit={submitHandler} className="setting">
        <p>Your account and data will be deleted forever</p>
        {loading ? <LoadingSpinner /> : <div className={"message " + message.type}>{message.text}</div>}
        <button type="submit" className="delete-account">Delete Account</button>
      </StyledDeleteAccount>
      {showReauthentication && <Reauthentication hide={() => setShowReauthentication(false)} action={deleteAllData} />}
    </>
  )
}