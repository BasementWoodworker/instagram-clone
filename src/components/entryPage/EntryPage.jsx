import React from "react";

import { StyledEntryPage } from "./EntryPage.styles";
import { RegisterForm } from "./registerForm/RegisterForm";
import { LoginForm } from "./loginForm/LoginForm";
import { ChangeAction } from "./changeAction/ChangeAction";

export function EntryPage({ action }) {
  const currentForm = action === "register" ? <RegisterForm /> : <LoginForm />;
  const newAction = action === "register" ? "login" : "register"; 

  return(
    <StyledEntryPage className="entry-page">
      <img alt="image placeholder" />
      {currentForm}
      <ChangeAction newAction={newAction} />
    </StyledEntryPage>
  )
}