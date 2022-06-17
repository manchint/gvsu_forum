
import { getDatabase, onValue, push, ref } from "firebase/database";

export function addUser(item) {
    console.log(item)
    const db = getDatabase();
    const reference = ref(db,'users/');
    push(reference, item);
  };
  
  export function setupUsersDataListener(updateFunc) {
    const db = getDatabase();
    const reference = ref(db, "users/");
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
  