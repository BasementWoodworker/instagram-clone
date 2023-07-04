import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";

import { StyledChangeInfo } from "./ChangeInfo.styles";
import { selectUser, modifyInfo } from "../../../redux/features/user/userSlice";
import { LoadingSpinner } from "../../loadingSpinner/LoadingSpinner";
import { checkIfUsernameIsTaken } from "../../../reusableFunctions/checkIfUsernameIsTaken";

export function ChangeInfo() {
  const user = useSelector(selectUser);
  const [avatarUploadPreview, setAvatarUploadPreview] = useState((user && user.photoURL) ?? "");
  const [message, setMessage] = useState({ type: "", text: "" })
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const avatarUploadRef = useRef();
  const usernameRef = useRef();
  const fullNameRef = useRef();
  const username = (user && user.username) ?? "";
  const fullName = (user && user.fullName) ?? "";
  const userId = (user && user.uid) ?? "";

  const showSuccessMsg = () => setMessage({ type: "success", text: "✓ Profile successfully updated" });
  const showErrorMsg = (error) => setMessage({ type: "error", text: "Error updating profile: " + error });

  function handleAvatarPreview() {
    const previewURL = URL.createObjectURL(avatarUploadRef.current.files[0]);
    setAvatarUploadPreview(previewURL);
  }

  async function changeAvatar() {
    if (avatarUploadRef.current.files.length === 0 || userId === "") return;
    const newAvatarFile = avatarUploadRef.current.files[0];
    const storageRef = ref(getStorage(), `userImages/${userId}/avatar`);
    await uploadBytes(storageRef, newAvatarFile);
    const newAvatarURL = await getDownloadURL(storageRef);
    await updateProfile(getAuth().currentUser, {
      photoURL: newAvatarURL
    })
    return newAvatarURL;
  }

  async function changeUsername(newUsername) {
    if (newUsername !== user.username) await checkIfUsernameIsTaken(newUsername);
    const db = getFirestore();
    await updateDoc(doc(db, "users", user.uid), {
      username: newUsername
    })

    await deleteDoc(doc(db, "takenUsernames", user.username));
    await setDoc(doc(db, "takenUsernames", newUsername), {
       uid: user.uid
    });
  }

  async function changeFullName(newFullName) {
    await updateDoc(doc(getFirestore(), "users", user.uid), {
      fullName: newFullName
    })
  }

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const newUsername = usernameRef.current.value;
      const newFullName = fullNameRef.current.value;
      const newPhotoURL = await changeAvatar() ?? user.photoURL;
      console.log(newPhotoURL);
      console.log("Updated avatar")
      await changeUsername(newUsername);
      console.log("Updated username")
      await changeFullName(newFullName);
      dispatch(modifyInfo({
        username: newUsername,
        fullName: newFullName,
        photoURL: newPhotoURL
      }))
      showSuccessMsg()
    }
    catch(error) {
      showErrorMsg(error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user && user.photoURL) {
      setAvatarUploadPreview(user.photoURL)
    }
  }, [user]);

  return(
    <StyledChangeInfo onSubmit={submitHandler} className="setting">
      <h2 className="setting-type">Personal Information</h2>
      <label className="avatar">
        <img className="avatar-preview" src={avatarUploadPreview} />
        <span>Profile picture</span>
        <input type="file" accept="image/*" ref={avatarUploadRef} onInput={handleAvatarPreview} />
      </label>
      <label>
        <span>Username</span>
        <input type="text" required ref={usernameRef} defaultValue={username} placeholder=" " maxLength="20" />
      </label>
      <label>
        <span>Full Name</span>
        <input type="text" required ref={fullNameRef} defaultValue={fullName} placeholder=" " maxLength="30" />
      </label>
      {loading ? <LoadingSpinner /> : <div className={"message " + message.type}>{message.text}</div>}
      <button type="submit" disabled={loading}>Save</button>
    </StyledChangeInfo>
  )
}