import firebase from "./firebase";

const db = firebase.firestore();

export const COLLECTION_HABITS = "habits";
export const COLLECTION_USERS = "users";

export function createUser(uid, data) {
  return db
    .collection(COLLECTION_USERS)
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

function getHabitsCollection() {
  return db.collection(COLLECTION_HABITS);
}

export async function getUserHabits(uid) {
  const habits = getHabitsCollection();
  const query = habits.where("uid", "==", uid).orderBy("createdAt");
  const snapshot = await query.get();
  if (snapshot.empty) {
    return [];
  }
  return snapshot.docs.map((doc) => doc.data());
}

export async function getHabitById(id) {
  const habits = getHabitsCollection();
  const doc = await habits.doc(id).get();
  return doc.exists ? doc.data() : undefined;
}

export async function getHabitBySlug(slug: string) {
  const habits = getHabitsCollection();
  const query = habits.where("slug", "==", slug).limit(1);
  const snapshot = await query.get();
  if (snapshot.empty) {
    return undefined;
  }
  return snapshot.docs[0].data();
}

export async function createHabit(habit) {
  const docRef = await getHabitsCollection().add({
    ...habit,
    createdAt: new Date(),
  });
  const doc = await docRef.get();
  return doc.data();
}

export function updateHabit(id, habit) {
  const docRef = getHabitsCollection().doc(id);
  return docRef.set({ ...habit, updatedAt: new Date() }, { merge: true });
}

export function deleteHabit(id) {
  return getHabitsCollection().doc(id).delete();
}
