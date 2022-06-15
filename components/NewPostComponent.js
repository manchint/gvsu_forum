import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { Button, Input, Card } from "react-native-elements";

import { Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

import { initGvsuForumDB } from "../helpers/forum_config";
import { addPost } from "../helpers/forum_posts";

import { username  } from "../helpers/user_config";

const NewComponent = () => {
  const [postText, setPostText] = useState('')
  useEffect(() => {
    try {
      initGvsuForumDB();
    } catch (err) {
      console.log("An Error occurred while initializing DB"+err);
    }
  }, [])
  const onPostClickListerner = () => {
    addPost({text:postText, user: username})
  }
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
            onChangeText={value => setPostText(value)}
            value={postText}
          ></Input>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* <View>
            <Button title={"Like"}></Button>
          </View> */}
          <View>
            <Button title={"Post"} disabled={postText.length <= 0} onPress={onPostClickListerner}></Button>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default NewComponent;
