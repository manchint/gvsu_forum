import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//     apiKey: "AIzaSyCFQeec4C_5v_HuCIRjCACV95__H9I1nRU",
//     authDomain: "geocalculator-98c0b.firebaseapp.com",
//     projectId: "geocalculator-98c0b",
//     storageBucket: "geocalculator-98c0b.appspot.com",
//     messagingSenderId: "1072563158551",
//     appId: "1:1072563158551:web:ceae2d595b8592ec4d2652",
//     measurementId: "G-DYS7TTTZCL"
// };

const firebaseConfig = {
  apiKey: "AIzaSyB9jHrn_3vLNAJ9wq6zbGZblmlS7CSWSZg",
  authDomain: "gvsuforum-baa4f.firebaseapp.com",
  databaseURL: "https://gvsuforum-baa4f-default-rtdb.firebaseio.com",
  projectId: "gvsuforum-baa4f",
  storageBucket: "gvsuforum-baa4f.appspot.com",
  messagingSenderId: "317521063061",
  appId: "1:317521063061:web:47b80322e453e8a2bb7f9c",
  measurementId: "G-M8ZB1NERR9",
};

export function initGvsuForumDB() {
  initializeApp(firebaseConfig);
}
