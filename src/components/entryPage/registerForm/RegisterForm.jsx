import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile, deleteUser } from "firebase/auth";

export function RegisterForm() {
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    const auth = getAuth();
    console.log(emailRef.current.value);
    console.log(passwordRef.current.value);
    try {
      await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
      console.log("Created new user")
      await updateProfile(auth.currentUser, { displayName: userNameRef.current.value })
      console.log("Updated username")
      navigate("/feed");
    }
    catch(error) {
      console.log("Error creating new account", error)
    }
  }

  async function delUser(e) {
    e.preventDefault();
    const auth = getAuth();
    try {
      setTimeout(() => deleteUser(auth.currentUser).then(console.log("USER DELETED SUCCESSFULLY")), 1000)
    }
    catch(error) {
      console.log("Error deleting user", error);
    }
  }

  return (
    <>
    <form onSubmit={submitHandler}>
      <h1>Create new account</h1>
      <label>
        <span>Your Username</span>
        <input required ref={userNameRef} />
      </label>
      <label>
        <span>Email</span>
        <input type="email" required ref={emailRef} />
      </label>
      <label>
        <span>Password</span>
        <input type="password" required ref={passwordRef} />
      </label>
      <label>
        <span>Confirm password</span>
        <input type="password" required ref={passwordConfirmationRef} />
      </label>
      <button type="submit">Register</button>
    </form>
    <button type="button" onClick={delUser}>Delete user</button>
    </>
  )
}