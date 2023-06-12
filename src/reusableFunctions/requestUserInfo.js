import { getFirestore, doc, getDoc } from "firebase/firestore";

export async function requestUserInfo(uid) {
  const userRef = doc(getFirestore(), "users", uid);
  const userDoc = await getDoc(userRef);
  return userDoc.data();
}