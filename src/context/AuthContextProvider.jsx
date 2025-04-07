/** @format */

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import { AuthContext } from "./index.js";

const auth = getAuth(app);
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      console.log(currentUser);
    });

    return () => unsubscribe(); // Cleanup listener
  }, [loading]);
  const updateUserInfo = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  const userAuth = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    updateUserInfo,
  };
  return (
    <>
      <AuthContext.Provider value={userAuth}>{children}</AuthContext.Provider>
    </>
  );
};

export default AuthContextProvider;
