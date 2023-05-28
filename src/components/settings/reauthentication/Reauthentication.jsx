import React, { useRef, useState } from "react";
import { getAuth, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

import { StyledReauthentication } from "./Reauthentication.styles";
import { LoadingSpinner } from "../../loadingSpinner/LoadingSpinner";

export function Reauthentication({ hide, action }) {
  const passwordRef = useRef();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const user = getAuth().currentUser;
    const credential = EmailAuthProvider.credential(user.email, passwordRef.current.value);
    reauthenticateWithCredential(user, credential).then(() => {
      console.log("Correct password");
      hide();
      action();
    }).catch(error => {
      if (error.message === "Firebase: Error (auth/wrong-password).") error.message = "Wrong password";
      setErrorMsg(error.message);
    }).finally(() => {
      setLoading(false);
    })
  }

  return(
    <StyledReauthentication onMouseDown={hide}>
      <form onMouseDown={e => e.stopPropagation()} onSubmit={handleSubmit}>
        <label>
          <div>Please enter your current password</div>
          <input type="password" required ref={passwordRef} onInput={() => setErrorMsg("")} autoComplete="off" />
        </label>
        {loading ? <LoadingSpinner /> : <div className="message error">{errorMsg}</div>}
        <button type="submit">Confirm</button>
        <button className="close" type="button" onClick={hide}>✖</button>
      </form>
    </StyledReauthentication>
  )
}