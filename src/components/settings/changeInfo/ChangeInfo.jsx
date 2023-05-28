import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { StyledChangeInfo } from "./ChangeInfo.styles";
import { selectUser, setUser } from "../../../redux/features/user/userSlice";
import defaultAvatar from "../../../assets/icons/default-avatar.svg";
import { LoadingSpinner } from "../../loadingSpinner/LoadingSpinner";

export function ChangeInfo() {
  const user = useSelector(selectUser);
  const [avatarUploadPreview, setAvatarUploadPreview] = useState(defaultAvatar);
  const [message, setMessage] = useState({ type: "", text: "" })
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const avatarUploadRef = useRef();
  const userNameRef = useRef();
  const username = (user && user.name) ?? "";
  const userId = (user && user.id) ?? "";
  const currentAvatar = (user && user.photoURL) ?? defaultAvatar;

  const showSuccessMsg = () => setMessage({ type: "success", text: "✓ Profile successfully updated" });
  const showErrorMsg = (error) => setMessage({ type: "error", text: "Error updating profile: " + error });

  function handleAvatarPreview() {
    const previewURL = URL.createObjectURL(avatarUploadRef.current.files[0]);
    setAvatarUploadPreview(previewURL);
  }

  async function updateAvatar() {
    if (avatarUploadRef.current.files.length === 0 || userId === "") return;
    const newAvatarFile = avatarUploadRef.current.files[0];
    const storageRef = ref(getStorage(), `${userId}/avatar`);
    await uploadBytes(storageRef, newAvatarFile);
    const newAvatarURL = await getDownloadURL(storageRef);
    await updateProfile(getAuth().currentUser, {
      photoURL: newAvatarURL
    })
  }

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    const user = getAuth().currentUser;
    try {
      await updateAvatar();
      await updateProfile(user, {
        displayName: userNameRef.current.value,
      })
      dispatch(setUser(user))
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
        <input type="text" required ref={userNameRef} defaultValue={username} />
      </label>
      {loading ? <LoadingSpinner /> : <div className={"message " + message.type}>{message.text}</div>}
      <button type="submit">Save</button>
    </StyledChangeInfo>
  )
}