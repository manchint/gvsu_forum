import { getDatabase, onValue, push, ref, set } from "firebase/database";
// import {firebase} from '@react-native-firebase/app';
import { initGvsuForumDB } from "./forum_config";
import * as FileSystem from "expo-file-system";
import firebase from "firebase/app";
import base64 from "react-native-base64";

const getBase64StringFromDataURL = (dataURL) =>
  dataURL.replace("data:", "").replace(/^.+,/, "");
  return dataURL
}
export const addPost = async (item) => {
  const db = getDatabase();
  item.image = getBase64StringFromDataURL(item.image);
  // item.image = base64.encode(item.image);
  const reference = ref(db, "posts/");
  push(reference, item);
}

export function setupPostsDataListener(updateFunc) {
  const db = getDatabase();
  const reference = ref(db, "posts/");
  onValue(reference, (snapshot) => {
    console.log("setupPostsDataListener fires up with: ", snapshot);
    if (snapshot?.val()) {
      const fbObject = snapshot.val();
      const newArr = [];
      Object.keys(fbObject).map((key, index) => {
        console.log(key, "||", index, "||", fbObject[key]);
        newArr.push({ ...fbObject[key], id: key });
      });
      console.log(newArr);
      updateFunc(newArr);
    } else {
      updateFunc([]);
    }
  });
}

export function updatePost(item) {
  const key = item.id;
  delete item.id;
  const db = getDatabase();
  const reference = ref(db, `posts/${key}`);
  set(reference, item);
}

export function stopDataListener(collection_id) {
  const db = getDatabase();
  let unsubscribe = firebase.firestore().collection(collection_id).onSnapshot((snapshot) =>
  console.log("stopPostsDataListener fires up with: ", snapshot)
  );
  unsubscribe();
  // const reference = ref(db, "posts/");
  // push(reference, item);
}
