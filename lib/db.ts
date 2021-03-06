import { DocumentData } from "@firebase/firestore-types";
import { AppUser } from "~l/auth";
import firebase from "./firebase";
import { HabitType } from "./habits";

const db = firebase.firestore();

export const COLLECTION_HABITS = "habits";
export const COLLECTION_USERS = "users";

export function createUser(uid, data) {
  return db
    .collection(COLLECTION_USERS)
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}
export async function loadUser(uid) {
  const user = await db.collection(COLLECTION_USERS).doc(uid).get();
  return user.data();
}

export function userUpdate(user: AppUser) {
  return db.collection(COLLECTION_USERS).doc(user.uid).update(user);
}

function getHabitsCollection() {
  return db.collection(COLLECTION_HABITS);
}

const transformFirebaseHabit = (habitDoc: DocumentData): HabitType => {
  const data = habitDoc.data();
  const id = habitDoc.id;
  const { name, completed, slug, createdAt, updatedAt, toggledOn } = data;
  const result = { ...data, name, completed, slug, id };
  if (createdAt && typeof createdAt.toDate === "function") {
    result.createdAt = createdAt.toDate();
  }
  if (updatedAt && typeof updatedAt.toDate === "function") {
    result.updatedAt = updatedAt.toDate();
  }
  if (toggledOn && typeof toggledOn.toDate === "function") {
    result.toggledOn = toggledOn.toDate();
  }
  Object.entries(completed).forEach(([key, value]) => {
    if (typeof value === "boolean") {
      result.completed[key] = { state: value };
    }
  });
  return result;
};

export async function getUserHabits(uid) {
  const habits = getHabitsCollection();
  const query = habits.where("uid", "==", uid);
  query.orderBy("createdAt");
  const snapshot = await query.get();
  if (snapshot.empty) {
    return [];
  }
  return snapshot.docs.map((doc) => {
    return transformFirebaseHabit(doc);
  });
}

export async function getHabitById(id) {
  const habits = getHabitsCollection();
  const doc = await habits.doc(id).get();
  return doc.exists ? transformFirebaseHabit(doc) : undefined;
}

export async function getHabitBySlug(slug: string) {
  const habits = getHabitsCollection();
  const query = habits.where("slug", "==", slug).limit(1);
  const snapshot = await query.get();
  if (snapshot.empty) {
    return undefined;
  }
  return transformFirebaseHabit(snapshot.docs[0]);
}

export async function createHabit(habit) {
  const docRef = await getHabitsCollection().add({
    ...habit,
    createdAt: new Date(),
  });
  const doc = await docRef.get();
  return transformFirebaseHabit(doc);
}

export function updateHabit(id, habit) {
  const docRef = getHabitsCollection().doc(id);
  return docRef.set({ ...habit, updatedAt: new Date() }, { merge: true });
}

export function deleteHabit(id) {
  return getHabitsCollection().doc(id).delete();
}
