import React from "react";
import { useLocation } from "react-router-dom";

import { StyledEntryPage } from "./EntryPage.styles";
import { RegisterForm } from "./registerForm/RegisterForm";
import { LoginForm } from "./loginForm/LoginForm";
import { ChangeAction } from "./changeAction/ChangeAction";

export function EntryPage() {
  const location = useLocation().pathname;
  const currentForm = location === "/register" ? <RegisterForm /> : <LoginForm />;
  const newLocation = location === "/register" ? "/login" : "/register"; 

  return(
    <StyledEntryPage className="entry-page">
      <img alt="image placeholder" />
      {currentForm}
      <ChangeAction newLocation={newLocation} />
    </StyledEntryPage>
  )
}