import React, { useEffect } from "react";
import { BrowserRouter ,Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "../firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

import { loggedIn, loggedOut } from "./redux/features/user/userSlice";
import { GlobalStyles } from "./GlobalStyles";
import { RootPathRedirect } from "./RootPathRedirect";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { EntryPage } from "./components/entryPage/EntryPage";
import { Feed } from "./components/feed/Feed";
import { Settings } from "./components/settings/Settings"
import { MakeNewPost } from "./components/makeNewPost/MakeNewPost";

const firebaseApp = initializeApp(getFirebaseConfig());

async function requestUserInfo(uid) {
  const userRef = doc(getFirestore(), "users", uid);
  const user = await getDoc(userRef);
  return user.data();
}

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user === null) {
        dispatch(loggedOut);
      } else {
        requestUserInfo(user.uid).then((userInfo) => {
          const { username, fullName } = userInfo;
          dispatch(loggedIn({
            username,
            fullName,
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL
          }));
        })
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
        <Route path="/make-new-post" element={<MakeNewPost />} />
      </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}