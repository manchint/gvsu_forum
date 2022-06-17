import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { Button, Input, Card } from "react-native-elements";

import { Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

import { initGvsuForumDB } from "../helpers/forum_config";
import { addPost } from "../helpers/forum_posts";

import { data } from "../helpers/user_config";
import ImagePickerComponent from "./ImagePickerComponent";
import { MaterialIcons } from "@expo/vector-icons";

const NewComponent = () => {
  const [postData, setPostData] = useState({
    text: "",
    image: null,
    user: 'wfcds',
    likes: [],
    comments: [],
    date: "",
  });
  useEffect(() => {
    try {
      initGvsuForumDB();
    } catch (err) {
      console.log("An Error occurred while initializing DB" + err);
    }
  }, []);

  //gets current timestamp in required format
  function getTimestamp() {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const today = new Date();
    const date =
      days[today.getDay()] +
      " " +
      months[today.getMonth()] +
      " " +
      today.getDate() +
      " " +
      today.getFullYear();

    return date;
  }
  const onPostClickListerner = () => {
    addPost({ ...postData, date: getTimestamp() });
  };
  return (
    <Card>
      <View>
        <View
          style={{ margin: 10, alignContent: "center", flexDirection: "row" }}
        >
          <FontAwesome name="user-circle-o" size={24} color="black" />
          <Text style={{ marginLeft: 20 }}>Hello World</Text>
        </View>
        <View>
          <Input
            placeholder="Had a Query? Post Here..!"
            leftIcon={{ type: "font-awesome", name: "comment" }}
            style={{ borderRadius: 10, borderWidth: 1 }}
            onChangeText={(val) => setPostData({ ...postData, text: val })}
            value={postData.text}
          ></Input>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{}}>
            <ImagePickerComponent
              image={postData.image}
              setImage={(img) => setPostData({ ...postData, image: img })}
            />
          </View>
          {/* <MaterialIcons
            name="cancel"
            size={24}
            color="red"
            style={{ margin: 10, marginRight: 100 }}
          /> */}
          <View style={{ flexDirection: "row", alignContent: "space-between" }}>
            <Button
              title={"Post"}
              disabled={postData.text.length <= 0}
              onPress={onPostClickListerner}
              style={{ marginRight: 10 }}
            ></Button>
            <Button
              title={"Cancel"}
              disabled={postData.text.length <= 0}
              onPress={onPostClickListerner}
            ></Button>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default NewComponent;
