
import { getDatabase, onValue, push, ref, remove, set, getInputVal } from "firebase/database";

import { getStorage, uploadBytesResumable } from "firebase/storage";
import { initGvsuForumDB } from "./forum_config";
export function addPost(item) {
    console.log(item)

    const app = initGvsuForumDB();
    const storage = getStorage(app);

    const storageRef = ref(storage, item.image);
    // var storage = firebase.storage().ref(item.image);

  //get file url
  storageRef
    .getDownloadURL()
    .then(function(url) {
      console.log(url);
    })
    .catch(function(error) {
      console.log("error encountered");
    });
  //   const storage = getStorage(app);

  //   const storageRef = ref(storage, item.image);
  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //         // const percent = Math.round(
  //         //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //         // );

  //         // // update progress
  //         // setPercent(percent);
  //     },
  //     (err) => console.log(err),
  //     () => {
  //         // download url
  //         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  //             console.log(url);
  //         });
  //     }
  // ); 



    // var storage = firebase.storage();
    // var storageref=storage.ref();
    // storageref.put(file).then(() => {
    //   firebase.storage().ref("posts").child(user.uid).getDownloadURL()
    //     .then((downloadURL) => {
    //       const db = getDatabase();
    //       item.image = downloadURL;
    //       const reference = ref(db,'posts/');
    //       push(reference, item);
    //     })})

    //uploading iimage
    // var type = getInputVal('types');
    // var storage = firebase.storage();
    // var file=item.image;
    // var storageref=storage.ref();
    // var thisref=storageref.child(type).child(file.name).put(file);
    // thisref.on('state_changed',function(snapshot) {


    // }, function(error) {
    
    // }, function() {
    // // Uploaded completed successfully, now we can get the download URL
    // thisref.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    //   //getting url of image
    //   //document.getElementById("url ").value=downloadURL;
    //   alert('uploaded successfully');
    //   //adding post data
    //   const db = getDatabase();
    //   item.image = downloadURL;
    //   const reference = ref(db,'posts/');
    //   push(reference, item);
    //   //saveMessage(downloadURL);
    //   });
    // });
    // // Get values
    // //var url = getInputVal('url');
    // // Save message
    // // saveMessage(url);

    
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
  