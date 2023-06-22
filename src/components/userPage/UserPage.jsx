import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getFirestore, doc, getDoc } from "firebase/firestore";

import { StyledUserPage } from "./UserPage.styles";
import { UserPreview } from "./userPreview/UserPreview";
import { LoadingSpinner } from "../loadingSpinner/LoadingSpinner";
import { selectUser} from "../../redux/features/user/userSlice";
import { requestUserInfo } from "../../reusableFunctions/requestUserInfo";
import { getUserAvatar } from "../../reusableFunctions/getUserAvatar";
import { SmallPost } from "./smallPost/SmallPost";
import { UserPostModal } from "../userPostModal/UserPostModal";
import { followUser, unFollowUser, getUserFollowers } from "../../reusableFunctions/followFunctions";

async function getUserId(username) {
  const response = await getDoc(doc(getFirestore(), "takenUsernames", username));
  if (!response.data()) throw new Error("User not found");
  return response.data().uid;
}

export function UserPage() {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [openedPost, setOpenedPost] = useState(null);
  const [displayedContent, setDisplayedContent] = useState("posts");
  const followButtonRef = useRef();
  const location = useLocation();
  const username = location.pathname.replace("/user/", "").replace("%20", " ");
  const you = useSelector(selectUser);
  
  useEffect(() => {
    console.log("location changed", location);
    setUserInfo(null);
    setDisplayedContent("posts");
    setLoading(true);
    getUserId(username).then(userId =>{
      Promise.all([requestUserInfo(userId), getUserAvatar(userId), getUserFollowers(userId)]).then(response => {
        const userInfoObject = response[0];
        const userAvatarURL = response[1];
        const userFollowers = response[2];
        setUserInfo({
          ...userInfoObject,
          avatarURL: userAvatarURL,
          uid: userId,
          followers: userFollowers
        })
        setUserPosts(userInfoObject.posts.reverse());
      })
      .finally(() => setLoading(false))
    })
    .catch(() => setLoading(false))
    
  }, [location])

  async function handleFollowing() {
    try {
      followButtonRef.current.disabled = true;
      if (you.following.includes(userInfo.uid)) {
        await unFollowUser(you.uid, userInfo.uid);
        setUserInfo(info => ({ ...info, followers: info.followers.filter(userId => userId !== you.uid) }))
      } else {
        await followUser(you.uid, userInfo.uid);
        setUserInfo(info => ({ ...info, followers: [you.uid].concat(info.followers) }))
      }
    }
    catch(error) {
      console.log(error);
    }
    finally {
      followButtonRef.current.disabled = false;
    }
  }

  function modifyInfoAfterRemovingDeletedUserFromFollowings(removedId) {
    setUserInfo(info => {
      return {
        ...info,
        following: info.following.filter(elem => elem !== removedId)
      }
    })
  }

  if (loading) return(
    <StyledUserPage>
      <LoadingSpinner size="200px" type={2} />
    </StyledUserPage>
  )

  if (!userInfo) return(
    <StyledUserPage>
      <div className="user-not-found">User not found</div>
    </StyledUserPage>
  );

  const followers = userInfo.followers.map(uid => <UserPreview uid={uid} key={uid} />);
  const following = userInfo.following.map(uid => <UserPreview uid={uid} key={uid} isOnYourPage={you.uid === userInfo.uid} yourId={you.uid} modifyInfoAfterRemovingDeletedUserFromFollowings={modifyInfoAfterRemovingDeletedUserFromFollowings} />);

  return(
    <StyledUserPage>
      <div className="user-info">
        <img className="avatar" src={userInfo.avatarURL} />
        <div>
          <h2 className="username">{userInfo.username}</h2>
          <div className="full-name">{userInfo.fullName}</div>
          {you && you.uid !== userInfo.uid && 
            <button className="follow" onClick={handleFollowing} ref={followButtonRef}>
              {you.following.includes(userInfo.uid) ? "Unfollow" : "Follow"}
            </button>}
          <div className="change-displayed-content">
            <button onClick={() => setDisplayedContent("posts")}>
              <h4>{userInfo.posts.length + " "}</h4>
              <span>{userInfo.posts.length === 1 ? "post" : "posts"}</span>
            </button>
            <button onClick={() => setDisplayedContent("followers")}>
              <h4>{userInfo.followers.length + " "}</h4>
              <span>{userInfo.followers.length === 1 ? "follower" : "followers"}</span>
            </button>
            <button onClick={() => setDisplayedContent("following")}>
              <h4>{userInfo.following.length}</h4>
              <span>following</span>
            </button>
          </div>
          <div>{userInfo.description}</div>
        </div>
      </div>
      <div className="separator-line-profile"></div>
      {displayedContent === "posts" ? 
        <div className="posts">
          {userPosts.map(id => <SmallPost key={id} postId={id} userId={userInfo.uid} setOpenedPost={setOpenedPost} />)}
        </div> :
        <div className="users">
          {displayedContent === "followers" ? 
            (followers.length !== 0 ? followers : <div className="no-followers">No followers</div>)  :
            (following.length !== 0 ? following : <div className="no-following">Not following anyone</div>)
          }
        </div>
      }
      {openedPost && <UserPostModal postInfo={openedPost} closeModal={() => setOpenedPost(null)} avatar={userInfo.avatarURL} username={username} />}
    </StyledUserPage>
  )
}