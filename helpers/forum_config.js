import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyCFQeec4C_5v_HuCIRjCACV95__H9I1nRU",
    authDomain: "geocalculator-98c0b.firebaseapp.com",
    projectId: "geocalculator-98c0b",
    storageBucket: "geocalculator-98c0b.appspot.com",
    messagingSenderId: "1072563158551",
    appId: "1:1072563158551:web:ceae2d595b8592ec4d2652",
    measurementId: "G-DYS7TTTZCL"
};
export function initGvsuForumDB() {
  initializeApp(firebaseConfig);
};
