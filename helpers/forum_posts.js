import { getDatabase, onValue, push, ref, set } from "firebase/database";
// import {firebase} from '@react-native-firebase/app';
import { initGvsuForumDB, getFirebaseObject } from "./forum_config";
import * as FileSystem from "expo-file-system";
//import firebase from "firebase/app";
import uuid from 'uuid';


//import firebase from "firebase/app";
 
const getBase64StringFromDataURL = (dataURL) => {
  dataURL.replace("file://", "")
  dataURL.replace("data:", "").replace(/^.+,/, "");
  return dataURL
}
export const addPost = async (item) => {
  const db = getDatabase();
  // const firebase = getFirebaseObject()
  // const storage = getStorage()
  // const storageRef = ref(storage, `postImages/${item.id}`);

  // storageRef.put(file).then((snapshot) => {
  //   console.log("Uploaded!");
  // });



  


  // const blob = await new Promise((resolve, reject) => {
  //   const xhr = new XMLHttpRequest();
  //   xhr.onload = function() {
  //     resolve(xhr.response);
  //   };
  //   xhr.onerror = function(e) {
  //     console.log(e);
  //     reject(new TypeError('Network request failed'));
  //   };
  //   xhr.responseType = 'blob';
  //   xhr.open('GET', item.image, true);
  //   xhr.send(null);
  // });

  // const ref = firebase
  //   .storage()
  //   .ref(db, "posts/")
  //   .child(uuid.v4());
  // const snapshot = await ref.put(blob);

  // // We're done with the blob, close and release it
  // blob.close();
  // console.log(await snapshot.ref.getDownloadURL())

  //return await snapshot.ref.getDownloadURL();





















  //console.log('Image uploaded to the bucket!');
  //const db = getDatabase();
  item.image = getBase64StringFromDataURL(item.image);
  const reference = ref(db, "posts/");
  push(reference, item);

  // const filename = item.image.substring(item.image.lastIndexOf('/') + 1);
  // //   console.log(filename)
  // //   getFileBlob(item.image, blob =>{
  // //     firebase.storage().ref().put(blob).then(function(snapshot) {
  // //        console.log('Uploaded a blob or file!');
  // //     })
  // // })

  // // const file = FileSystem.readAsStringAsync(item.image, {
  // //   encoding: FileSystem.EncodingType.Base64,
  // // });

  // // Create a ref in Firebase (I'm using my user's ID)
  // //const storage = getStorage();
  // const ref = firebase.storage().ref().child(`postImages/${item.id}`);

  // // Upload Base64 image to Firebase
  // const snapshot = ref.putString(file, 'base64');

  // // Create a download URL
  // const remoteURL = snapshot.ref.getDownloadURL();

  // console.log(remoteURL)
  // //Return the URL
  // return remoteURL;

  // const uploadUri = item.image;
  // const task = firebase
  //   .storage()
  //   .ref(filename)
  //   .putFile(uploadUri);
  // // set progress state
  // task.on('state_changed', snapshot => {
  //   setTransferred(
  //     Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
  //   );
  // });
  // try {
  //   task;
  // } catch (e) {
  //   console.error(e);
  // }
  // task.then((snapshot) => {
  //   console.log('Image uploaded to the bucket!');
  //   const db = getDatabase();
  //   item.image = snapshot.ref.getDownloadURL();
  //   const reference = ref(db, "posts/");
  //   push(reference, item);
  // });
  // const app = initGvsuForumDB()
  // const storage = getStorage();

  // // Create a reference to 'mountains.jpg'
  // const mountainsRef = ref(storage, 'mountains.jpg');

  // // Create a reference to 'images/mountains.jpg'
  // const mountainImagesRef = ref(storage, 'images/mountains.jpg');

  // // While the file names are the same, the references point to different files
  // mountainsRef.name === mountainImagesRef.name;           // true
  // mountainsRef.fullPath === mountainImagesRef.fullPath;   // false
  // const task = storage()
  //   .ref(filename)
  //   .putFile(item.image);
  //   task.on('state_changed', snapshot => {
  //     setTransferred(
  //       Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
  //     );
  //   });
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

export function stopPostsDataListener() {
  const db = getDatabase();
  let unsubscribe = ref(db, "posts/").onSnapshot((snapshot) =>
    console.log("stopPostsDataListener fires up with: ", snapshot)
  );
  unsubscribe();
  // const reference = ref(db, "posts/");
  // push(reference, item);
}
