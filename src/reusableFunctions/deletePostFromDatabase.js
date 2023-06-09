import { getFirestore, doc, updateDoc, getDocs, collection, deleteDoc, arrayRemove } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";

export async function deletePostFromDatabase(postId, userId) {
  await deletePostComments(postId);
  await deletePostDoc(postId);
  await deletePostImage(postId, userId);
  await deletePostIdFromUserProfile(postId, userId);
}

export async function deletePostComments(postId) {
  const commentsRef = collection(getFirestore(), "posts", postId, "comments");
  const comments = await getDocs(commentsRef);
  for (const comment of comments.docs) {
    await deleteDoc(comment.ref);
  }
}

export async function deletePostDoc(postId) {
  const post = doc(getFirestore(), "posts", postId);
  await deleteDoc(post);
}

async function deletePostIdFromUserProfile(postId, userId) {
  await updateDoc(doc(getFirestore(), "users", userId), {
    posts: arrayRemove(postId)
  })
}

async function deletePostImage(postId, userId) {
  const imageRef = ref(getStorage(), `userImages/${userId}/${postId}`);
  await deleteObject(imageRef);
}