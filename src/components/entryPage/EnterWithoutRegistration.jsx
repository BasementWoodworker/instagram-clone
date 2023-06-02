import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export function EnterWithoutRegistration() {
  const navigate = useNavigate();

  async function logInAsTestAccount() {
    signInWithEmailAndPassword(getAuth(), "test.user.for.fake.instagram@gmail.com", "asdzxc123")
      .then(userCredential => {
        navigate("/feed");
      })
      .catch(error => {
        console.log(error);
      })
  }

  return(
    <button onClick={logInAsTestAccount} className="enter-without-registration">Enter without registration</button>
  )
}