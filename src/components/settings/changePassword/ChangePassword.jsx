import React, { useRef, useState } from "react";
import { getAuth, updatePassword } from "firebase/auth";

import { StyledChangePassword } from "./ChangePassword.styles";
import { Reauthentication } from "../reauthentication/Reauthentication";
import { LoadingSpinner } from "../../loadingSpinner/LoadingSpinner";

export function ChangePassword() {
  const [showReauthentication, setShowReauthentication] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" })
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const showSuccessMsg = () => setMessage({ type: "success", text: "✓ Password successfully changed" });
  const showErrorMsg = (error) => setMessage({ type: "error", text: "Error changing password: " + error });
  const clearMessage = () => setMessage({ type: "", text: "" });

  function submitHandler(e) {
    e.preventDefault();
    if (!checkPasswordMatch()) {
      setMessage({ type: "error", text: "Passwords don't match" });
      return;
    }
    setShowReauthentication(true);
  }

  async function changePassword() {
    try {
      setLoading(true);
      const user = getAuth().currentUser;
      await updatePassword(user, passwordRef.current.value);
      showSuccessMsg();
    }
    catch(error) {
      showErrorMsg(error);
    }
    finally {
      setLoading(false);
    }
  }

  function checkPasswordMatch() {
    clearMessage();
    return passwordRef.current.value === passwordConfirmationRef.current.value;
  }

  return(
    <>
      <StyledChangePassword onSubmit={submitHandler} className="setting">
        <h2 className="setting-type">Password</h2>
        <label>
          <span>Enter new password</span>
          <input type="password" required minLength="6" ref={passwordRef} onInput={checkPasswordMatch} autoComplete="off" placeholder=" " />
        </label>
        <label>
          <span>Confirm new password</span>
          <input type="password" required minLength="6" ref={passwordConfirmationRef} onInput={checkPasswordMatch} autoComplete="off" placeholder=" " />
        </label>
        {loading ? <LoadingSpinner /> : <div className={"message " + message.type}>{message.text}</div>}
        <button type="submit">Save</button>
      </StyledChangePassword>
      {showReauthentication && <Reauthentication hide={() => setShowReauthentication(false)} action={changePassword} />}
    </>
  )
}