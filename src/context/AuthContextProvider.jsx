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
import useAxiosPublic from "../hook/useAxiosPublic";
import { AuthContext } from "./index.js";

const auth = getAuth(app);
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

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

      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axiosPublic
          .post("/jwt", userInfo)
          .then((res) => {
            if (res?.data?.token) {
              localStorage.setItem("access-token", res.data?.token);
              setLoading(false); // ✅ Only after token is ready
            } else {
              setLoading(false);
            }
          })
          .catch(() => setLoading(false)); // Handle fetch error
      } else {
        localStorage.removeItem("access-token");
        setLoading(false); // ✅ Only set here if not logged in
      }
    });

    return () => unsubscribe();
  }, [axiosPublic]);

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
