import { getStorage, ref, listAll, deleteObject } from "firebase/storage";

export async function deleteFirebaseStorageFolder(path) {
  const folderRef = ref(getStorage(), path);
  listAll(folderRef).then(async folder => {
    for (const fileRef of folder.items) {
      await deleteObject(fileRef);
    }
    for (const subFolderRef of folder.prefixes) {
      await deleteFolder(subFolderRef.fullPath)
    }
  })
}