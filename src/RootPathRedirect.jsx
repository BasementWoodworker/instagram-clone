import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function isLoggedIn() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(getAuth(), user => {
      user ? resolve() : reject();
      unsubscribe();
    })
  })
}

export function RootPathRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn()
      .then(() => navigate("/feed"))
      .catch(() => navigate("/login"))
  }, [])

  return null;
}