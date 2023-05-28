import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, deleteUser } from "firebase/auth";

import { StyledDeleteAccount } from "./DeleteAccount.styles";
import { Reauthentication } from "../reauthentication/Reauthentication";
import { LoadingSpinner } from "../../loadingSpinner/LoadingSpinner";
import { loggedOut } from "../../../redux/features/user/userSlice";

export function DeleteAccount() {
  const [showReauthentication, setShowReauthentication] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" })
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showSuccessMsg = () => setMessage({ type: "success", text: "✓ Account successfully deleted" });
  const showErrorMsg = (error) => setMessage({ type: "error", text: "Error deleting account: " + error });

  function submitHandler(e) {
    e.preventDefault();
    setShowReauthentication(true);
  }

  async function deleteAccount() {
    try {
      setLoading(true)
      await deleteUser(getAuth().currentUser);
      showSuccessMsg();
      dispatch(loggedOut);
      setTimeout(() => navigate("/"), 3000);
    }
    catch(error) {
      showErrorMsg(error);
    }
    finally {
      setLoading(false)
    }
  }

  return(
    <>
      <StyledDeleteAccount onSubmit={submitHandler} className="setting">
        <p>Your account and data will be deleted forever</p>
        {loading ? <LoadingSpinner /> : <div className={"message " + message.type}>{message.text}</div>}
        <button type="submit" className="delete-account">Delete Account</button>
      </StyledDeleteAccount>
      {showReauthentication && <Reauthentication hide={() => setShowReauthentication(false)} action={deleteAccount} />}
    </>
  )
}