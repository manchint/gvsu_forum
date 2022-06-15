
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";

export function addPost(item) {
    console.log(item)
    const db = getDatabase();
    const reference = ref(db,'posts/');
    push(reference, item);
  };
  
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
        console.log(newArr)
        updateFunc(newArr);
      } else {
        updateFunc([]);
      }
    });
  } 

export function stopPostsDataListener() {

}
  