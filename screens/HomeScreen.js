import { View, FlatList, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import PostComponent from "../components/PostComponent";
import NewPostComponent from "../components/NewPostComponent";
//helpers files
import { initGvsuForumDB } from "../helpers/forum_config";
import { setupPostsDataListener } from "../helpers/forum_posts";

import SelectDropdown from "react-native-select-dropdown";

import { removeData } from "../helpers/storage_init";
import { getData } from "../helpers/storage_init";

const options = [
  "GVSU HOME",
  "BLACK BOARD",
  "BANNER",
  "FACULTY STAFF",
  "LOGOUT",
];

const HomeScreen = ({ route, navigation }) => {
  const [loginData, setLoginData] = useState();
  getData(setLoginData);
  const [postData, setPostsData] = useState([]);
  useEffect(() => {
    try {
      initGvsuForumDB();
    } catch (err) {
      console.log(err);
    }
    setupPostsDataListener((posts) => {
      setPostsData(posts);
    });
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <></>,
      headerRight: () => (
        <View
          style={{
            marginRight: 25,
            width: 100,
            alignContent: "center",
          }}
        >
          <SelectDropdown
            data={options}
            defaultButtonText={
              <EvilIcons
                name="user"
                size={40}
                color="blue"
                alignContent={"center"}
              />
            }
            dropdownIconPosition={"left"}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              if (selectedItem === "GVSU HOME")
                Linking.openURL("https://www.gvsu.edu/");
              else if (selectedItem === "BLACK BOARD")
                Linking.openURL("https://lms.gvsu.edu/ultra/institution-page");
              else if (selectedItem === "BANNER")
                Linking.openURL("https://www.gvsu.edu/banner/");
              else if (selectedItem === "FACULTY STAFF")
                Linking.openURL("https://www.gvsu.edu/facultystaff.htm");
              else if (selectedItem === "LOGOUT") {
                removeData();
                navigation.navigate("login");
              }
            }}
            buttonTextAfterSelection={() => {
              return <EvilIcons name="user" size={24} color="black" />;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
        </View>
      ),
    });
  });

  const navigateToComments = (data) => {
    console.log("CS", data.length);
    navigation.navigate("Comments", {
      data: data,
    });
  };

  const renderEachPost = (data) => {
    return (
      <PostComponent item={data.item} navigateToComments={navigateToComments} />
    );
  };

  return (
    <View>
      {loginData?.email ? (
        <NewPostComponent />
      ) : (
        <NewPostComponent></NewPostComponent>
      )}
      <FlatList data={postData} renderItem={renderEachPost} />
    </View>
  );
};

export default HomeScreen;
