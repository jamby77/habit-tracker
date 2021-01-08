import firebase from "./firebase";

const db = firebase.firestore();

export function createUser(uid, data) {
  return db
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}
