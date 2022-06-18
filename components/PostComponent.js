import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { Button, Card } from "react-native-elements";
import { getData } from "../helpers/storage_init";

import { initGvsuForumDB } from "../helpers/forum_config";
import { updatePost } from "../helpers/forum_posts";

const PostComponent = (props) => {
  useEffect(() => {
    try {
      initGvsuForumDB();
    } catch (err) {
      console.log("An Error occurred while initializing DB" + err);
    }
  }, []);
  const checkCurrentUserLike = () => {
    console.log("loginData", loginData.email);
    var currentUserLike = props.item.likes.filter(
      (item) => item == loginData.email
    );
    console.log("crr", currentUserLike);
    return currentUserLike.length > 0;
  };
  const [loginData, setLoginData] = useState();
  getData(setLoginData);
  const updateLike = () => {
    let likes = props.item.likes;
    if (likes === 0) {
      likes = [loginData.email];
    } else {
      if (checkCurrentUserLike()) {
        likes = props.item?.likes.filter((item) => item !== loginData.email);

        likes = likes.length === 0 ? 0 : likes;
        console.log("Number", likes);
      } else {
        likes.push(loginData.email);
      }
    }
    updatePost({ ...props.item, likes: likes });
  };

  return (
    <Card>
      <View style={[styles.margin20, styles.border1]}>
        <View style={[styles.flexHorizontal]}>
          <EvilIcons
            name="user"
            size={24}
            color="black"
            style={[styles.margin5]}
          />
          <View style={[styles.flexVertical]}>
            <Text>{props.item.user}</Text>
            <Text>{props.item.date}</Text>
          </View>
        </View>
        <View style={[styles.border]}>
          <Text style={[styles.margin5]}>{props.item.text}</Text>
        </View>
        {props.item?.image ? (
          <Image
            source={{ uri: props.item.image }}
            style={{ width: 200, height: 200 }}
            accessibilityLabel={'Failed to load Image'}
          />
        ) : (
          <></>
        )}
        <View style={[styles.flexHorizontal]}>
          <Button
            style={[styles.padding10]}
            title={
              props.item?.likes === 0
                ? ` ${props.item?.likes} Likes`
                : `${props.item?.likes.length} Likes`
            }
            onPress={updateLike}
            disabled={!loginData?.email}
          ></Button>
          <Button
            style={[styles.padding10]}
            title={
              props.item.comments === 0
                ? ` ${props.item.comments} Comments`
                : `${props.item.comments.length} Comments`
            }
            onPress={() => props.navigateToComments(props.item)}
          ></Button>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  flexHorizontal: {
    flexDirection: "row",
  },
  flexVertical: {
    flexDirection: "column",
  },
  margin20: {
    marginLeft: 20,
    marginRight: 20,
  },
  margin5: {
    margin: 5,
  },
  border: {
    border: "1px",
  },
  border1: {},
  padding10: {
    padding: 10,
  },
});

export default PostComponent;
