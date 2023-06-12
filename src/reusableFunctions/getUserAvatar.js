import { getStorage, ref, getDownloadURL } from "firebase/storage";

export async function getUserAvatar(uid) {
  let userAvatar;
  try {
    userAvatar = await getDownloadURL(ref(getStorage(), `userImages/${uid}/avatar`));
  }
  catch {
    userAvatar = await getDownloadURL(ref(getStorage(), `default-avatar.svg`));
  }
  return userAvatar;
}