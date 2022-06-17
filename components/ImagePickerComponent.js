import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";
export default function ImagePickerComponent({ image, setImage }) {
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("media", result);

    if (!result.cancelled) {
      setImage(result.uri);
      //onImagePicked(result.uri)
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {image ? (
        <View>
          <TouchableOpacity onPress={() => setImage(null)}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        </View>
      ) : (
        <Button title="Pick an image" onPress={pickImage} />
      )}
    </View>
  );
}
