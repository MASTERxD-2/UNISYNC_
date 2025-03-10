import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBUe2slQh59m0SzaxfWENPXtWodJcqTmDw",
    authDomain: "unisync-8f122.firebaseapp.com",
    projectId: "unisync-8f122",
    storageBucket: "unisync-8f122.appspot.com",
    messagingSenderId: "1071480344517",
    appId: "1:1071480344517:web:a18bdcc6b68ac7e2c405ac"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    return result.user.getIdToken();
};