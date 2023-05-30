import React, { useEffect } from "react";
import { BrowserRouter ,Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "../firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { setUser, loggedOut } from "./redux/features/user/userSlice";
import { GlobalStyles } from "./GlobalStyles";
import { RootPathRedirect } from "./RootPathRedirect";
import { EntryPage } from "./components/entryPage/EntryPage";
import { Feed } from "./components/feed/Feed";
import { Settings } from "./components/settings/Settings"
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";

const firebaseApp = initializeApp(getFirebaseConfig());

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user === null) {
        dispatch(loggedOut);
      } else {
        dispatch(setUser(user));
      }
    })
  }, [])

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <main>
      <Routes>
        <Route path="/" element={<RootPathRedirect />} />
        <Route path="/login" element={<EntryPage />} />
        <Route path="/register" element={<EntryPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}