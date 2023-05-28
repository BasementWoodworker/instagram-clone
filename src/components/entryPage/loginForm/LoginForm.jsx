import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export function LoginForm() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  function submitHandler(e) {
    e.preventDefault();
    const auth = getAuth();
    console.log(emailRef.current.value)
    console.log(passwordRef.current.value);
    signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then(userCredential => {
        console.log(userCredential);
        navigate("/feed");
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <form onSubmit={submitHandler}>
      <h1>Login</h1>
      <label>
        <span>Email</span>
        <input type="email" required ref={emailRef} defaultValue={"test.user.for.fake.instagram@gmail.com"} />
      </label>
      <label>
        <span>Password</span>
        <input type="password" required ref={passwordRef} defaultValue={"asdzxc123"} />
      </label>
      <button>Log In</button>
    </form>
  )
}