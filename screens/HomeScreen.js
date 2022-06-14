import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Feather } from "@expo/vector-icons";
//components
import PostComponent from "../components/PostComponent";
import NewComponent from "../components/NewComponent";

const HomeScreen = ({ route, navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Feather
            style={{ marginRight: 10 }}
            name="menu"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      ),
    });
  });
  return <PostComponent />;
  // return <NewComponent />;
};

export default HomeScreen;
