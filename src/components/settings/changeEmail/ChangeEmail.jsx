import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, updateEmail } from "firebase/auth";

import { StyledChangeEmail } from "./ChangeEmail.styles";
import { selectUser, setUser } from "../../../redux/features/user/userSlice";
import { Reauthentication } from "../reauthentication/Reauthentication";
import { LoadingSpinner } from "../../loadingSpinner/LoadingSpinner";

export function ChangeEmail() {
  const [showReauthentication, setShowReauthentication] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" })
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const emailRef = useRef();
  const user = useSelector(selectUser);
  const currentEmail = (user && user.email) ?? "";

  const showSuccessMsg = () => setMessage({ type: "success", text: "✓ Email successfully changed" });
  const showErrorMsg = (error) => setMessage({ type: "error", text: "Error changing email: " + error });

  async function submitHandler(e) {
    e.preventDefault();
    setShowReauthentication(true);
  }

  async function changeEmail() {
    try {
      setLoading(true);
      const user = getAuth().currentUser;
      console.log(emailRef.current.value);
      await updateEmail(user, emailRef.current.value);
      dispatch(setUser(user))
      showSuccessMsg();
    }
    catch(error) {
      showErrorMsg(error);
    }
    finally {
      setLoading(false);
    }
  }

  return(
    <>
      <StyledChangeEmail onSubmit={submitHandler} className="setting">
        <h2 className="setting-type">Email</h2>
        <label>
          <span>Enter new email</span>
          <input type="email" required ref={emailRef} defaultValue={currentEmail} autoComplete="off" />
        </label>
        {loading ? <LoadingSpinner /> : <div className={"message " + message.type}>{message.text}</div>}
        <button type="submit">Save</button>
      </StyledChangeEmail>
      {showReauthentication && <Reauthentication hide={() => setShowReauthentication(false)} action={changeEmail} />}
    </>
  )
}