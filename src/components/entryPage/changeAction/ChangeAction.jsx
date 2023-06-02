import React from "react";
import { Link } from "react-router-dom";

export function ChangeAction({ newLocation }) {
  let content = "";
  if (newLocation === "/register") {
    content = (
      <>
        <span>Don't have an account?</span>
        <Link to="/register">Sign up</Link>
      </>
    )
  } else if (newLocation === "/login") {
    content = (
      <>
        <span>Already have an account?</span>
        <Link to="/login">Log in</Link>
      </>
    )
  }

  return(
    <div className="change-action">
      {content}
    </div>
  )
}