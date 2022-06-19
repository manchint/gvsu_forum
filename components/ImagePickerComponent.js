import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";

import { AntDesign } from "@expo/vector-icons";
export default function ImagePickerComponent({ image, setImage }) {
  const [imageOption, setImageOption] = useState("");
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async (option = "sdc") => {
    // console.log("dfds", option);
    if (option === "camera") {
      let permission = await ImagePicker.requestCameraPermissionsAsync();
      if (permission.granted === false) {
        alert("Permission to access camera is required!");
        return;
      }
      let result = await ImagePicker.launchCameraAsync(
        {
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        console.log("media", result);

      if (!result?.cancelled) {
        setImage(result?.uri);
        //onImagePicked(result.uri)
      }
    } else {
      let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permission.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }
      let result = await ImagePicker.launchImageLibraryAsync(
        {
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        console.log("media", result);

      if (!result?.cancelled) {
        setImage(result?.uri);
        //onImagePicked(result.uri)
      }
    }
  };

  const openOptions = () => {
    Alert.alert(
      "Hey There!",
      "Two button alert dialog",
      [
        { text: "Upload fromGallery", onPress: () => pickImage("gallery") },
        {
          text: "Take photo",
          onPress: () => pickImage("camera"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {image ? (
        <View>
          <TouchableOpacity onPress={() => setImage(null)}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <Image source={{uri : image}} style={{ width: 70, height: 70 }} />
        </View>
      ) : (
        <Button title="Pick an image" onPress={openOptions} />
      )}
    </View>
  );
}

// import React, { useState, useEffect } from "react";
// import { Button, Image, View, Platform, TouchableOpacity } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { MaterialIcons } from "@expo/vector-icons";

// import { AntDesign } from "@expo/vector-icons";
// export default function ImagePickerComponent({ image, setImage }) {
//   useEffect(() => {
//     (async () => {
//       // console.log("platform", platform);
//       if (Platform.OS !== "web") {
//         const { status } =
//           await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== "granted") {
//           alert("Sorry, we need camera roll permissions to make this work!");
//         }
//       }
//     })();
//   }, []);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log("media", result);

//     if (!result.cancelled) {
//       setImage(result.uri);
//       //onImagePicked(result.uri)
//     }
//   };

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       {image ? (
//         <View>
//           <TouchableOpacity onPress={() => setImage(null)}>
//             <AntDesign name="close" size={24} color="black" />
//           </TouchableOpacity>
//           <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
//         </View>
//       ) : (
//         <Button title="Pick an image" onPress={pickImage} />
//       )}
//     </View>
//   );
// }
