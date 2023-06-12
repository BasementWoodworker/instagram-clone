import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { LoadingSpinner } from "../../loadingSpinner/LoadingSpinner";

export function LoginForm() {
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(getAuth(), emailRef.current.value, passwordRef.current.value)
      .then(userCredential => {
        // Function at App.jsx takes care of this
      })
      .catch(error => {
        if (error.message === "Firebase: Error (auth/wrong-password).") error.message = "Wrong password";
        if (error.message === "Firebase: Error (auth/user-not-found).") error.message = "User not found";
        setErrorMsg(error.message);
      })
      .finally(() => setLoading(false))
  }

  return (
    <form onSubmit={submitHandler}>
      <h1>Log In</h1>
      <label>
        <input type="email" required ref={emailRef} placeholder=" " />
        <span>Email</span>
      </label>
      <label>
        <input type="password" required ref={passwordRef} placeholder=" " />
        <span>Password</span>
      </label>
      {loading ? <LoadingSpinner /> : <div className="error-message">{errorMsg}</div>}
      <button type="submit">Log in</button>
    </form>
  )
}