import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
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

const theme = {
  darkblue: "#285e91",
  borderColor: "darkgrey"
}

export function App() {
  //window.scrollTo(0, 0); // This is here to avoid preserving scroll position when user goes to the same route. This with Date.now() keys on routes achieves
                         // page refresh effect without actually refreshing the page which happens when navigation icons are simply <a> instead of <Link> (Canceled)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  const [postsInUserPage, setPostsInUserPage] = useState([]);
  const [postsInFeed, setPostsInFeed] = useState([]);

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
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header />
        <main>
          <Routes location={previousLocation || location}>
            <Route path="/" element={<RootPathRedirect key={Date.now()} />} />
            <Route path="/login" element={<EntryPage key={Date.now()} />} />
            <Route path="/register" element={<EntryPage key={Date.now()} />} />
            <Route path="/feed" element={<Feed posts={postsInFeed} setPosts={setPostsInFeed} />} />
            <Route path="/settings" element={<Settings key={Date.now()} />} />
            <Route path="/make-new-post" element={<MakeNewPost key={Date.now()} />} />
            <Route path="/user/:username" element={<UserPage userPosts={postsInUserPage} setUserPosts={setPostsInUserPage} />} />
          </Routes>

          { (
            <Routes>
              <Route path="/post/:postId" element={<PostPage setPostsInUserPage={setPostsInUserPage} setPostsInFeed={setPostsInFeed} />} />
            </Routes>
          )}
        </main>
        <Footer />
      </ThemeProvider>
    </>
  )
}