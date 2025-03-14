import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useReducer,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Added getDoc for fetching existing data

const AuthContext = createContext({});

const initialState = {
  isLoading: true,
  userToken: null,
  user: null,
  authError: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_USER_TOKEN":
      return { ...state, userToken: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, authError: action.payload };
    case "CLEAR_ERROR":
      return { ...state, authError: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch({ type: "SET_USER", payload: user });
        const token = await user.getIdToken();
        dispatch({ type: "SET_USER_TOKEN", payload: token });
        await AsyncStorage.setItem("userToken", token);
      } else {
        dispatch({ type: "SET_USER", payload: null });
        dispatch({ type: "SET_USER_TOKEN", payload: null });
        await AsyncStorage.removeItem("userToken");
      }
      dispatch({ type: "SET_LOADING", payload: false });
    });

    return () => unsubscribe();
  }, []);

  const signup = async (name, email, password) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "CLEAR_ERROR" });

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(
        doc(db, "users", user.uid),
        {
          name,
          email,
          displayName: name, // Sync with Authentication
          createdAt: new Date(),
          lastLogin: new Date(),
        },
        { merge: true }
      );

      const token = await user.getIdToken();
      await AsyncStorage.setItem("userToken", token);
      dispatch({ type: "SET_USER_TOKEN", payload: token });
      dispatch({ type: "SET_USER", payload: { ...user, displayName: name } });
      dispatch({ type: "SET_LOADING", payload: false });
      return true;
    } catch (error) {
      console.log("Signup error:", error);
      dispatch({
        type: "SET_ERROR",
        payload: parseFirebaseError(error.code || error.message),
      });
      dispatch({ type: "SET_LOADING", payload: false });
      return false;
    }
  };

  const login = async (email, password) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "CLEAR_ERROR" });

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();
      await AsyncStorage.setItem("userToken", token);
      dispatch({ type: "SET_USER_TOKEN", payload: token });
      dispatch({ type: "SET_USER", payload: user });
      dispatch({ type: "SET_LOADING", payload: false });
      return true;
    } catch (error) {
      console.log("Login error:", error);
      dispatch({
        type: "SET_ERROR",
        payload: parseFirebaseError(error.code || error.message),
      });
      dispatch({ type: "SET_LOADING", payload: false });
      return false;
    }
  };

  const logout = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("userToken");
      dispatch({ type: "SET_USER_TOKEN", payload: null });
      dispatch({ type: "SET_USER", payload: null });
      dispatch({ type: "SET_LOADING", payload: false });
      return true;
    } catch (error) {
      console.log("Logout error:", error);
      dispatch({ type: "SET_LOADING", payload: false });
      return false;
    }
  };

  const parseFirebaseError = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "This email is already in use. Please use a different email or try logging in.";
      case "auth/invalid-email":
        return "The email address is not valid.";
      case "auth/weak-password":
        return "The password is too weak. Please use a stronger password.";
      case "auth/user-not-found":
        return "No user found with this email. Please check your email or sign up.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/too-many-requests":
        return "Too many unsuccessful login attempts. Please try again later.";
      default:
        return "An error occurred. Please try again.";
    }
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        signup,
        isLoading: state.isLoading,
        userToken: state.userToken,
        user: state.user,
        authError: state.authError,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export const useAuth = () => useContext(AuthContext);
