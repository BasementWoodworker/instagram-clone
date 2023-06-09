import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, setDoc, doc, getDocs, collection } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { LoadingSpinner } from "../../loadingSpinner/LoadingSpinner";
import { checkIfUsernameIsTaken } from "../../../reusableFunctions/checkIfUsernameIsTaken";
import { loggedIn } from "../../../redux/features/user/userSlice";

export function RegisterForm() {
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const usernameRef = useRef();
  const fullNameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function clearValidity(e) {
    e.target.setCustomValidity("");
    setErrorMsg("");
  }

  async function createUserInFirestore(username, fullName, uid) {
    const user = {
      username,
      fullName,
      posts: [],
      following: []
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
    dispatch(loggedIn({
      username,
      fullName,
      email,
      uid: auth.currentUser.uid,
      photoURL: defaultAvatar,
      following: []
    }));
  }

  function checkPasswordMismatch() {
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) throw new Error("Passwords do not match");
  }

  function modifyErrorMessage(error) {
    console.log(error.message);
    if (error.message === "Firebase: Error (auth/invalid-email).") {
      error.message = "Invalid email";
      emailRef.current.setCustomValidity("Invalid email");
    }
    if (error.message === "Firebase: Error (auth/email-already-in-use).") {
      error.message = "Email is already in use";
      emailRef.current.setCustomValidity("Invalid email");
    }
    if (error.message === "This username is taken") {
      usernameRef.current.setCustomValidity("This username is taken");
    }
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
        <input type="email" required ref={emailRef} placeholder=" " onInput={clearValidity} />
        <span>Email</span>
      </label>
      <label>
        <input required ref={usernameRef} placeholder=" " onInput={clearValidity} maxLength="20" />
        <span>Username</span>
      </label>
      <label>
        <input required ref={fullNameRef} placeholder=" " maxLength="30" />
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
      <button type="submit" disabled={loading}>Register</button>
    </form>
    </>
  )
}