import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  getInputVal,
} from "firebase/database";
import storage from "firebase/storage";
export function addPost(item) {
  // const filename = item.image.substring(item.image.lastIndexOf('/') + 1);
  // const uploadUri = item.image;
  // const task = storage()
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
  // task.then(() => {
  console.log("Image uploaded to the bucket!");
  const db = getDatabase();
  const reference = ref(db, "posts/");
  push(reference, item);
  // });
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
