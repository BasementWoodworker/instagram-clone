import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { LoadingSpinner } from "../loadingSpinner/LoadingSpinner";

export function EnterWithoutRegistration() {
  const [loading, setLoading] = useState(false);

  async function logInAsTestAccount() {
    setLoading(true);
    signInWithEmailAndPassword(getAuth(), "test.user.for.fake.instagram@gmail.com", "asdzxc2264")
      .catch(error => {
        console.log(error);
        setLoading(false);
      })
  }

  return(
    <>
      <button onClick={logInAsTestAccount} className="enter-without-registration">Enter without registration</button>
      {loading && <div style={{alignSelf: "center", marginTop: "8px"}}>
        <LoadingSpinner className="enter-without-registration-spinner" />
      </div>}
    </>
  )
}