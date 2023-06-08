import { getFirestore, doc, getDocs, collection, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";

export async function deletePostFromDatabase(postId, userId) {
  await deletePostComments(postId);
  await deletePostDoc(postId);
  await deletePostImage(postId, userId);
}

export async function deletePostComments(postId) {
  const commentsRef = collection(getFirestore(), "posts", postId, "comments");
  const comments = await getDocs(commentsRef);
  for (const comment of comments.docs) {
    console.log(comment);
    await deleteDoc(comment.ref);
  }
}

export async function deletePostDoc(postId) {
  const post = doc(getFirestore(), "posts", postId);
  await deleteDoc(post);
}

async function deletePostImage(postId, userId) {
  const imageRef = ref(getStorage(), `userImages/${userId}/${postId}`);
  await deleteObject(imageRef);
}