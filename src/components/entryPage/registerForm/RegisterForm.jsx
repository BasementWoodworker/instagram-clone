import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile, deleteUser } from "firebase/auth";

import { LoadingSpinner } from "../../loadingSpinner/LoadingSpinner";

export function RegisterForm() {
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false);
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
      console.log("Created new user")
      await updateProfile(auth.currentUser, { displayName: userNameRef.current.value });
      console.log("Updated username")
      navigate("/feed");
    }
    catch(error) {
      if (error.message === "Firebase: Error (auth/invalid-email).") error.message = "Invalid email";
      if (error.message === "Firebase: Error (auth/email-already-in-use).") error.message = "Error: Email is already in use";
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
        <input required ref={userNameRef} placeholder=" " />
        <span>Username</span>
      </label>
      <label>
        <input type="email" required ref={emailRef} placeholder=" " />
        <span>Email</span>
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