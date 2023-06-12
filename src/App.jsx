import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "../firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { loggedIn, loggedOut } from "./redux/features/user/userSlice";
import { GlobalStyles } from "./GlobalStyles";
import { RootPathRedirect } from "./RootPathRedirect";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { EntryPage } from "./components/entryPage/EntryPage";
import { Feed } from "./components/feed/Feed";
import { Settings } from "./components/settings/Settings"
import { MakeNewPost } from "./components/makeNewPost/MakeNewPost";
import { UserPage } from "./components/userPage/UserPage";
import { PostPage } from "./components/postPage/PostPage";

import { requestUserInfo } from "./reusableFunctions/requestUserInfo";

const firebaseApp = initializeApp(getFirebaseConfig());

export function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      const currentURL = new URL(window.location.href);
      if (user !== null) {
        if (currentURL.pathname === "/register") return;
        requestUserInfo(user.uid).then((userInfo) => {
          const { username, fullName, following } = userInfo;
          dispatch(loggedIn({
            username,
            fullName,
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL,
            following
          }));
          if (currentURL.pathname === "/login" || currentURL.pathname === "/") navigate("/feed");
        })
      }
    })
  }, [])

  return (
    <>
      <GlobalStyles />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<RootPathRedirect />} />
          <Route path="/login" element={<EntryPage />} />
          <Route path="/register" element={<EntryPage />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/make-new-post" element={<MakeNewPost />} />
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="/post/:postId" element={<PostPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}