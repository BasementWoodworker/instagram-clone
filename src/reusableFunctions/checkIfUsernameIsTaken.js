import { getFirestore, doc, getDoc } from "firebase/firestore";

export async function checkIfUsernameIsTaken(newUsername) {
  const dbUsername = await getDoc(doc(getFirestore(), "takenUsernames", newUsername));
  if (dbUsername.exists()) throw new Error("This username is taken");
}