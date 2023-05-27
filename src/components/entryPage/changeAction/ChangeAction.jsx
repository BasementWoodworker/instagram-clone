import React from "react";
import { Link } from "react-router-dom";

export function ChangeAction({ newAction }) {
  let content = "";
  if (newAction === "register") {
    content = (
      <>
        <span>Don't have an account?</span>
        <Link to="/register">Sign Up</Link>
      </>
    )
  } else if (newAction === "login") {
    content = (
      <>
        <span>Already have an account?</span>
        <Link to="/login">Log In</Link>
      </>
    )
  }

  return(
    <div>
      {content}
    </div>
  )
}