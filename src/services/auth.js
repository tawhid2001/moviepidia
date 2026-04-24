import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { createUserDocument } from "./users";
import { toast } from "react-toastify";

export const signup = async (email, name, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await createUserDocument({ ...userCredential.user, displayName: name });
    toast.success("Account created successfully!");
    return userCredential;
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].replaceAll("-", " "));
  }
};

export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successful!");
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].replaceAll("-", " "));
  }
};

export const logout = async () => {
  await signOut(auth);
};
