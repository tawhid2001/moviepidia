import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const favoritesCollection = (userId) => {
  return collection(db, "auth_users", userId, "favorites");
};

export const addFavorite = async (userId, movie) => {
  await setDoc(doc(favoritesCollection(userId), movie.imdbID), {
    imdbID: movie.imdbID,
    Title: movie.Title,
    Year: movie.Year,
    Type: movie.Type,
    Poster: movie.Poster,
    savedAt: serverTimestamp(),
  });
};

export const removeFavorite = async (userId, movieId) => {
  await deleteDoc(doc(favoritesCollection(userId), movieId));
};

export const getFavorites = async (userId) => {
  const snapshot = await getDocs(favoritesCollection(userId));

  return snapshot.docs.map((favorite) => favorite.data());
};