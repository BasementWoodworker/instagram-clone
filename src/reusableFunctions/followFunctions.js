import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  collection,
  getDocs
} from "firebase/firestore";
import { store } from "../redux/store";
import { selectUser, modifyInfo } from "../redux/features/user/userSlice";

export async function followUser(yourId, followedUserId) {
  const firestore = getFirestore();
  await setDoc(doc(firestore, "users", followedUserId, "followers", yourId), { ownerId: followedUserId });
  await updateDoc(doc(firestore, "users", yourId), {
    following: arrayUnion(followedUserId)
  })
  const user = selectUser(store.getState());
  store.dispatch(modifyInfo({
    following: [followedUserId].concat([...user.following])
  }))
}

export async function unFollowUser(yourId, unfollowedUserId) {
  const firestore = getFirestore();
  await deleteDoc(doc(firestore, "users", unfollowedUserId, "followers", yourId));
  await updateDoc(doc(firestore, "users", yourId), {
    following: arrayRemove(unfollowedUserId)
  })
  const user = selectUser(store.getState());
  store.dispatch(modifyInfo({
    following: [...user.following].filter(id => id !== unfollowedUserId)
  }))
}

export async function getUserFollowers(uid) {
  const firestore = getFirestore();
  const followers = await getDocs(collection(firestore, "users", uid, "followers"));
  const followersIds = followers.docs.map(docRef => docRef.id)
  return followersIds;
}

export async function unfollowEveryone(uid) {
  const firestore = getFirestore();
  const userFollowing = (await getDoc(doc(firestore, "users", uid))).data().following;
  for (const followingId of userFollowing) {
    await deleteDoc(doc(firestore, "users", followingId, "followers", uid));
  }
}