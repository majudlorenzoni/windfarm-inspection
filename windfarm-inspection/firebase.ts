// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwK2s4pehXL00USKs0_FPXWvldxFFRi_I",
  authDomain: "windvision-a1cdb.firebaseapp.com",
  projectId: "windvision-a1cdb",
  storageBucket: "windvision-a1cdb.firebasestorage.app",
  messagingSenderId: "293749034956",
  appId: "1:293749034956:web:f72ee512c1a492560a9769",
  measurementId: "G-8N0P4DHJ0T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };