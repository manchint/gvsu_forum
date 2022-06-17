import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
//components
import PostComponent from "../components/PostComponent";
import NewPostComponent from "../components/NewPostComponent";

import { initGvsuForumDB } from "../helpers/forum_config";
import { setupPostsDataListener } from "../helpers/forum_posts";


import SelectDropdown from "react-native-select-dropdown";

import { data } from "../helpers/user_config";
import { removeData } from "../helpers/storage_init";

const countries = ["GVSU HOME", "BLACK BOARD", "BANNER", "FACULTY STAFF", "LOGOUT"];
const HomeScreen = ({ route, navigation }) => {
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
            // alignItems: "center",
            // flexDirection: "row",
          }}
        >
          <SelectDropdown
            data={countries}
            defaultButtonText={
              <EvilIcons
                name="user"
                size={40}
                color="blue"
                // marginRight={500}
                alignContent={"center"}
              />
            }
            // rowTextStyle={SelectDropdown}
            // marginRight={50}
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
              else if (selectedItem === 'LOGOUT') {
                removeData()
                navigation.navigate('login')
              } 
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return <EvilIcons name="user" size={24} color="black" />;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />
          {/* <Button title={"HELP"}></Button> */}
        </View>

        // <ModalDropdown options={['option 1', 'option 2']}/>
        //<EvilIcons name="user" size={24} color="black"  style={[styles.margin5]}/>
        // <Button title={"LOGOUT"} style={{ marginRight: 10 }} onPress={() => navigation.navigate("Login")}></Button>
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
      {/* <Button
        onPress={() =>
          Linking.openURL("https://lms.gvsu.edu/ultra/institution-page")
        }
      >
        sdfdsfc
      </Button> */}
      {data.email ? (
        <NewPostComponent />
      ) : (
        <NewPostComponent></NewPostComponent>
      )}
      <FlatList data={postData} renderItem={renderEachPost} />
    </View>
  );
};
// return <NewComponent />;

export default HomeScreen;
