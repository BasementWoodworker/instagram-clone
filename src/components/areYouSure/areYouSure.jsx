import React, { useState } from "react";

import { StyledAreYouSure } from "./areYouSure.styles";
import { LoadingSpinner } from "../loadingSpinner/LoadingSpinner";

export function AreYouSure({ text, action, hide }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function doTheAction() {
    setLoading(true);
    try {
      await action();
      hide();
    }
    catch(error) {
      setErrorMsg(error.message);
      setLoading(false);
    }
  }

  return(
    <StyledAreYouSure onMouseDown={hide} className="modal">
      <div className="container" onMouseDown={(e) => e.stopPropagation()}>
        <div className="text">
          <h2>Are you sure?</h2>
          <div>{text}</div>
        </div>
        {loading ? <LoadingSpinner /> : <div className="error-message">{errorMsg}</div>}
        <div className="buttons">
          <button onClick={doTheAction} className="yes">Ok</button>
          <button onClick={hide} className="no">Cancel</button>
        </div>
      </div>
    </StyledAreYouSure>
  )
}