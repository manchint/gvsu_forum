import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Linking
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
//components
import PostComponent from "../components/PostComponent";
import NewPostComponent from "../components/NewPostComponent";

import { initGvsuForumDB } from "../helpers/forum_config";
import { setupPostsDataListener } from "../helpers/forum_posts";

//import ModalDropdown from 'react-native-modal-dropdown';

import SelectDropdown from 'react-native-select-dropdown'

import { data } from "../helpers/user_config";
import { Button } from "react-native-elements";

const countries = ["gvsu home", "Canada", "Australia", "Ireland"]
const HomeScreen = ({ route, navigation }) => {
  //const {name} = route.params
  //console.log("xvxc",route.params?.name)
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
    //if(route.params?.name === 'gvsu home')  window.location.href("https://www.gvsu.edu")
  }, []);
  useEffect(() => {
    console.log("dfdfd" + postData);
  }, [postData]);
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
      headerRight: () => (
        <SelectDropdown
          data={countries}
          defaultButtonText = "asfds"
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
            if(selectedItem === 'gvsu home') Linking.openURL("https://lms.gvsu.edu/ultra/institution-page") 
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return <EvilIcons name="user" size={24} color="black"/>
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        />
        // <ModalDropdown options={['option 1', 'option 2']}/>
         //<EvilIcons name="user" size={24} color="black"  style={[styles.margin5]}/>
        // <Button title={"LOGOUT"} style={{ marginRight: 10 }} onPress={() => navigation.navigate("Login")}></Button>
      ),
    });
  });

  const renderEachPost = (data) => {
    return <PostComponent item={data.item} />;
  };
  return (
    <View>
      <Button onPress={() => Linking.openURL("https://lms.gvsu.edu/ultra/institution-page")}>sdfdsfc</Button>
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
