import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
//components
import PostComponent from "../components/PostComponent";
import NewPostComponent from "../components/NewPostComponent";

import { initGvsuForumDB } from "../helpers/forum_config";
import { setupPostsDataListener } from "../helpers/forum_posts";

const HomeScreen = ({ route, navigation }) => {
  const [postData, setPostsData] = useState([])
  useEffect(() => {
    try {
      initGvsuForumDB();
    } catch (err) {
      console.log(err);
    }
    setupPostsDataListener((posts) => {
      setPostsData(posts);
    });
  }, [])
  useEffect(() => {
    console.log('dfdfd'+postData)
  }, [postData])
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

  const renderEachPost = (index, item) => {
    console.log(item)
    return (<PostComponent item={item}/>)
  }
  return (<View>
      <NewPostComponent />
      <FlatList
            data={postData}
            renderItem={renderEachPost}
        />
    </View>
  )
}
  // return <NewComponent />;

  

export default HomeScreen;
