import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, setDoc, doc, getDocs, collection } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { LoadingSpinner } from "../../loadingSpinner/LoadingSpinner";
import { checkIfUsernameIsTaken } from "../../../reusableFunctions/checkIfUsernameIsTaken";

export function RegisterForm() {
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const usernameRef = useRef();
  const fullNameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const navigate = useNavigate();

  async function createUserInFirestore(username, fullName, uid) {
    const user = {
      username,
      fullName,
      posts: []
    }
    setDoc(doc(getFirestore(), "users", uid), user);
    setDoc(doc(getFirestore(), "takenUsernames", username), { uid });
  }

  async function createNewAccount(email, username, fullName, password) {
    const auth = getAuth();
    const defaultAvatar = await getDownloadURL(ref(getStorage(), "default-avatar.svg"));
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { photoURL: defaultAvatar });
    await createUserInFirestore(username, fullName, auth.currentUser.uid);
  }

  function checkPasswordMismatch() {
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) throw new Error("Passwords do not match");
  }

  function modifyErrorMessage(error) {
    if (error.message === "Firebase: Error (auth/invalid-email).") error.message = "Invalid email";
    if (error.message === "Firebase: Error (auth/email-already-in-use).") error.message = "Error: Email is already in use";
  }

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    try {
      checkPasswordMismatch();
      await checkIfUsernameIsTaken(usernameRef.current.value);
      await createNewAccount(
        emailRef.current.value,
        usernameRef.current.value,
        fullNameRef.current.value,
        passwordRef.current.value
      );
      navigate("/feed");
    }
    catch(error) {
      modifyErrorMessage(error);
      setErrorMsg(error.message);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <>
    <form onSubmit={submitHandler}>
      <h1>Create new account</h1>
      <label>
        <input type="email" required ref={emailRef} placeholder=" " />
        <span>Email</span>
      </label>
      <label>
        <input required ref={usernameRef} placeholder=" " />
        <span>Username</span>
      </label>
      <label>
        <input required ref={fullNameRef} placeholder=" " />
        <span>Full Name</span>
      </label>
      <label>
        <input type="password" required ref={passwordRef} placeholder=" " minLength="6" />
        <span>Password</span>
      </label>
      <label>
        <input type="password" required ref={passwordConfirmationRef} placeholder=" " minLength="6" />
        <span>Confirm password</span>
      </label>
      {loading ? <LoadingSpinner /> : <div className="error-message">{errorMsg}</div>}
      <button type="submit">Register</button>
    </form>
    </>
  )
}