import { View, FlatList, Linking, Picker } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

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
// import { Picker } from "react-native-web";

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
  const icon = () => {
    return <EvilIcons name="user" size={40} color="blue" />;
  };
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
            // rowStyle={"View"}
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
                navigation.navigate("Login");
              }
            }}
            buttonTextAfterSelection={() => {
              return <EvilIcons name="user" size={40} color="blue" />;
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
