import React from "react";
import { useLocation } from "react-router-dom";

import { StyledEntryPage } from "./EntryPage.styles";
import { RegisterForm } from "./registerForm/RegisterForm";
import { LoginForm } from "./loginForm/LoginForm";
import { ChangeAction } from "./changeAction/ChangeAction";
import { EnterWithoutRegistration } from "./EnterWithoutRegistration";
import greetingImage from "./../../assets/images/greeting-image.jpg";

export function EntryPage() {
  const location = useLocation().pathname;
  const currentForm = location === "/register" ? <RegisterForm /> : <LoginForm />;
  const newLocation = location === "/register" ? "/login" : "/register"; 

  return(
    <StyledEntryPage className="entry-page">
      <img className="greeting-image" alt="greeting image" src={greetingImage} />
      <div className="right-side">
        {currentForm}
        <ChangeAction newLocation={newLocation} />
        {location === "/login" ? <EnterWithoutRegistration /> : null}
      </div>
    </StyledEntryPage>
  )
}