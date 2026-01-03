import { initializeApp } from "firebase/app";
// السطر اللي كان ناقصك هو اللي تحت ده 👇
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyC8MWLQi9bAHUoNglnnCJkswcK8iE8dNJw",
  authDomain: "robino-92eec.firebaseapp.com",
  projectId: "robino-92eec",
  storageBucket: "robino-92eec.firebasestorage.app",
  messagingSenderId: "1056305756200",
  appId: "1:1056305756200:web:733b9ce5b0fd18ed56dd1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// الآن السطر ده هيشتغل بدون أخطاء
export const storage = getStorage(app);