import React, { useState } from "react";

import { StyledSettings } from "./Settings.styles";
import { ChangeInfo } from "./changeInfo/ChangeInfo";
import { ChangeEmail } from "./changeEmail/ChangeEmail";
import { ChangePassword } from "./changePassword/ChangePassword";
import { DeleteAccount } from "./deleteAccount/DeleteAccount";

export function Settings() {
  const [currentSetting, setCurrentSetting] = useState("ChangeInfo");
  const settingsForm = 
    currentSetting === "ChangeInfo" ? <ChangeInfo /> :
    currentSetting === "ChangeEmail" ? <ChangeEmail /> :
    currentSetting === "ChangePassword" ? <ChangePassword /> :
    currentSetting === "DeleteAccount" ? <DeleteAccount /> :
    null;

  return(
    <StyledSettings>
      <div className="setting-selection">
        <div onClick={() => setCurrentSetting("ChangeInfo")} className={currentSetting === "ChangeInfo" ? "selected" : ""}>Personal Information</div>
        <div onClick={() => setCurrentSetting("ChangeEmail")} className={currentSetting === "ChangeEmail" ? "selected" : ""}>Email</div>
        <div onClick={() => setCurrentSetting("ChangePassword")} className={currentSetting === "ChangePassword" ? "selected" : ""}>Password</div>
        <div onClick={() => setCurrentSetting("DeleteAccount")} className={currentSetting === "DeleteAccount" ? "selected" : ""}>Delete Account</div>
      </div>
      {settingsForm}
    </StyledSettings>
  )
}