
import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBymbIwn4xYkeFnf0bipQbtQZMGiHCsHNY",
  authDomain: "ecommerce-40eb6.firebaseapp.com",
  projectId: "ecommerce-40eb6",
  storageBucket: "ecommerce-40eb6.appspot.com",
  messagingSenderId: "230180477511",
  appId: "1:230180477511:web:3abc630d8ab1076ad62f62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleAuthProvider = new GoogleAuthProvider();