import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const createUserDocument = async (user) => {
    await setDoc(doc(db, "auth_users", user.uid), {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
    });
};