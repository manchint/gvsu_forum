import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";
import { Button, Input } from "react-native-elements";

import { Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

const NewComponent = () => {
  return (
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
        ></Input>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Button title={"Like"}></Button>
        </View>
        <View>
          <Button title={"Post"}></Button>
        </View>
      </View>
    </View>
  );
};

export default NewComponent;
