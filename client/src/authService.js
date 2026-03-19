import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";

// signup
export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
// login
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
// Google login
export function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

// GitHub login
export function loginWithGithub() {
  const provider = new GithubAuthProvider();
  return signInWithPopup(auth, provider);
}