//firebase configuration settings are here. It is pulled from there without needing to configure each file

 import { initializeApp } from "firebase/app";
 import { getFirestore } from "@react-firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDboV1BN0NOMmiudEueL-E6UIhgDXxGfic",
  authDomain: "walletconnector-9244a.firebaseapp.com",
  projectId: "walletconnector-9244a",
  storageBucket: "walletconnector-9244a.appspot.com",
  messagingSenderId: "1037472047112",
  appId: "1:1037472047112:web:94480249653fa69288f1bd"
};

 const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);