import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { createUserDocument } from "./users";

export const signup = async (email, name, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await createUserDocument({ ...userCredential.user, displayName: name });
  return userCredential;
};

export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  await signOut(auth);
};